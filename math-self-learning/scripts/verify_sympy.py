"""Checks every hand-solved homework step-answer with sympy."""
import json, pathlib
from sympy import I, FiniteSet, Interval, Lambda, Poly, S, Union, cancel, fraction, oo, real_root, solveset, sqrt, expand, simplify, sympify, solve, symbols, nsimplify

checks = json.loads((pathlib.Path(__file__).parent / "checks.json").read_text())
names = {s: symbols(s) for s in "a b c d g h j k l m n p q r s t u v w x y z".split()}
ns = {**names, "I": I}
# Radical problems assume every variable is positive (so sqrt(x**2) == x).
pos_ns = {**{s: symbols(s, positive=True) for s in names}, "I": I}
ok = bad = 0


def roots_match(c, key="roots"):
    v = names[c.get("variable", "x")]
    expr = sympify(c["expr"], ns)
    exact = {simplify(r) for r in solve(expr, v)}
    claimed = {simplify(sympify(r, ns)) for r in c[key]}
    good = len(exact) == len(claimed) and all(any(simplify(a - b) == 0 for b in exact) for a in claimed)
    if not good:
        print(f"   sympy roots ({key}):", exact)
    return good


X, Y = names["x"], names["y"]


def same_line(e, k):
    """Two expressions (= 0) describe the same line: a nonzero constant ratio."""
    ratio = cancel(sympify(k, ns) / sympify(e, ns))
    return not ratio.free_symbols and ratio != 0


def slope_of(e):
    e = sympify(e, ns)
    dy = e.diff(Y)
    return None if dy == 0 else simplify(-e.diff(X) / dy)


def on_line(e, pts):
    return all(simplify(sympify(e, ns).subs({X: sympify(str(px), ns), Y: sympify(str(py), ns)})) == 0 for px, py in pts)


def q_of(v):
    return sympify(v, ns) if isinstance(v, str) else sympify(str(v))


def point_set(pts):
    return {(simplify(q_of(a)), simplify(q_of(b))) for a, b in pts}


def line_check(c):
    e = c["line"]
    good = True
    if c.get("key"):
        good = same_line(e, c["key"])
    if good and c.get("original"):
        good = same_line(e, c["original"])
    if good and c.get("through"):
        good = on_line(e, c["through"])
    if good and c.get("ref"):
        m, mr = slope_of(e), slope_of(c["ref"])
        if c["rel"] == "parallel":
            good = (m is None and mr is None) or (m is not None and mr is not None and simplify(m - mr) == 0)
        else:
            good = (m is None and mr == 0) or (mr is None and m == 0) or (m is not None and mr is not None and simplify(m * mr + 1) == 0)
    if good and c.get("rel_ineq"):
        good = c["rel_ineq"] == c["key_rel"]
    return good


def quad_check(c):
    f = sympify(c["quad"], ns)
    h = solve(f.diff(X), X)[0]
    k = f.subs(X, h)
    good = simplify(h - q_of(c["vertex"][0])) == 0 and simplify(k - q_of(c["vertex"][1])) == 0
    if good and c.get("keyVertex"):
        good = simplify(h - q_of(c["keyVertex"][0])) == 0 and simplify(k - q_of(c["keyVertex"][1])) == 0
    if good and c.get("yint") is not None:
        good = simplify(f.subs(X, 0) - q_of(c["yint"])) == 0
    for key in ("zeros", "keyZeros"):
        if good and c.get(key) is not None:
            exact = {simplify(r) for r in solve(f, X) if r.is_real}
            claimed = {simplify(q_of(r)) for r in c[key]}
            good = len(exact) == len(claimed) and all(any(simplify(a - b) == 0 for b in exact) for a in claimed)
            if not good:
                print(f"   sympy zeros ({key}):", exact)
    return good


def system_check(c):
    e1, e2 = (sympify(e, ns) for e in c["system"])
    sols = [s for s in solve([e1, e2], [X, Y], dict=True) if s[X].is_real and s[Y].is_real]
    exact = {(simplify(s[X]), simplify(s[Y])) for s in sols}
    good = point_set(c["engine"]) == exact
    if good and c.get("key") is not None:
        good = point_set(c["key"]) == exact
    if not good:
        print("   sympy solutions:", exact)
    return good


def point_in_check(c):
    px, py = (q_of(v) for v in c["point"])
    holds = all(simplify(sympify(e, ns).subs({X: px, Y: py})) == 0 for e in c["pointIn"])
    return holds == (c["expect"] == "Yes")


def piecewise_check(c):
    """Engine piecewise function equals the key's on sample x-values (including endpoints)."""
    f, k = sympify(c["piecewise"], ns), sympify(c["key"], ns)
    good = True
    for x in c["samples"]:
        a, b = f.subs(X, q_of(x)), k.subs(X, q_of(x))
        if a.has(S.NaN) or b.has(S.NaN) or str(a) == "nan" or str(b) == "nan":
            good = good and str(a) == str(b)
        else:
            good = good and simplify(a - b) == 0
    for x, y in c.get("points", []):
        good = good and simplify(f.subs(X, q_of(x)) - q_of(y)) == 0
    return good


for c in checks:
    label = c["label"]
    try:
        if "line" in c:
            good = line_check(c)
        elif "slope" in c:
            pts = c["points"]
            dx = q_of(pts[1][0]) - q_of(pts[0][0])
            m = "undefined" if dx == 0 else simplify((q_of(pts[1][1]) - q_of(pts[0][1])) / dx)
            good = (m == "undefined" and c["slope"] == c["key"] == "undefined") or (m != "undefined" and simplify(m - q_of(c["slope"])) == 0 and simplify(m - q_of(c["key"])) == 0)
        elif "quad" in c:
            good = quad_check(c)
        elif "system" in c:
            good = system_check(c)
        elif "pointIn" in c:
            good = point_in_check(c)
        elif "piecewise" in c:
            good = piecewise_check(c)
        elif "points" in c and "expr" in c:
            # A written equation passes through the given points and matches the key.
            f = sympify(c["expr"], ns)
            good = all(simplify(f.subs(X, q_of(px)) - q_of(py)) == 0 for px, py in c["points"])
            if good and c.get("result") is not None:
                good = simplify(f - sympify(c["result"], ns)) == 0
            if good and c.get("key") is not None:
                good = simplify(f - sympify(c["key"], ns)) == 0
        elif "conicStd" in c:
            # Same curve: the given/key equation is a nonzero constant times the engine's standard form.
            ratio = cancel(sympify(c["conicGeneral"], ns) / sympify(c["conicStd"], ns))
            good = not ratio.free_symbols and ratio != 0
            if not good:
                print("   ratio:", ratio)
        elif "factored" in c:
            good = expand(sympify(c["expr"], ns) - sympify(c["factored"], ns)) == 0
            if good and c.get("roots") is not None:
                good = roots_match(c)
            if good and "divisor" in c:
                good = fraction(cancel(sympify(c["expr"], ns) / sympify(c["divisor"], ns)))[1].is_number
        elif "result" in c and "expr" in c:
            cns = pos_ns if c.get("positive") else ns
            good = simplify(sympify(c["expr"], cns) - sympify(c["result"], cns)) == 0
            if good and c.get("roots") is not None:
                good = roots_match(c)
            if good and c.get("keyRoots") is not None:
                good = roots_match(c, "keyRoots")
        elif "value" in c:
            good = simplify(sympify(c["value"], ns) - sympify(c["result"], ns)) == 0
        elif "roots" in c and c["roots"] is not None:
            good = roots_match(c)
            if good and c.get("keyRoots") is not None:
                good = roots_match(c, "keyRoots")
        elif "funcs" in c:
            v = names[c["v"]]
            loc = dict(ns)
            for fname, body in c["funcs"].items():
                loc[fname] = Lambda(v, sympify(body, ns))
            val = sympify(c["op"], loc)
            key = sympify(c["key"], ns)
            good = simplify(val - key) == 0 and simplify(sympify(c["engine"], ns) - key) == 0
            if not good:
                print("   sympy:", simplify(val), " engine:", c["engine"])
        elif "engineSet" in c:
            x = names["x"]
            expr = sympify(c["expr"], ns)
            rel = {"<": expr < 0, "<=": expr <= 0, ">": expr > 0, ">=": expr >= 0}[c["rel"]]
            exact = solveset(rel, x, S.Reals)
            sets = {"Union": Union, "Interval": Interval, "FiniteSet": FiniteSet, "EmptySet": S.EmptySet, "Reals": S.Reals, "oo": oo, "sqrt": sqrt, "True": True, "False": False}
            engine = sympify(c["engineSet"], locals=sets)
            key = sympify(c["keySet"], locals=sets)
            good = engine == exact and key == exact
            if not good:
                print("   sympy:", exact, " engine:", engine, " key:", key)
        elif "inverse" in c:
            spec = c["inverse"]
            v = symbols(spec.get("v", "x"))
            loc = {**ns, "x": v, "cbrt": lambda e: real_root(e, 3), "root5": lambda e: real_root(e, 5)}
            F = sympify(spec["f"], locals=loc)
            G = sympify(spec["g"], locals=loc)
            both = True
            for t in [-3.7, -1.3, 0.6, 2.2, 5.1]:
                try:
                    a = complex(F.subs(v, G.subs(v, t)).evalf())
                    b = complex(G.subs(v, F.subs(v, t)).evalf())
                except (TypeError, ZeroDivisionError):
                    continue
                if abs(a - t) > 1e-8 or abs(b - t) > 1e-8:
                    both = False
            good = both == spec["expect"]
        elif "allRoots" in c or "rationalRoots" in c:
            x = names["x"]
            expr = sympify(c["expr"], ns)
            exact = [simplify(r) for r in solve(expr, x)]
            same = lambda a, b: all(any(simplify(u - v) == 0 for v in b) for u in a) and all(any(simplify(u - v) == 0 for u in a) for v in b)
            if "allRoots" in c:
                engine = [sympify(r, ns) for r in c["allRoots"]]
                key = [sympify(r, ns) for r in c["keyRoots"]]
                good = same(engine, exact) and same(key, exact) and len(engine) == Poly(expr, x).degree()
            else:
                rational = [r for r in exact if r.is_rational]
                good = same([sympify(r, ns) for r in c["rationalRoots"]], rational) if rational or c["rationalRoots"] else True
            if not good:
                print("   sympy roots:", exact)
        elif "buildRoots" in c:
            x = names["x"]
            prod = sympify(c["lead"], ns)
            for r in c["buildRoots"]:
                prod *= (x - sympify(r, ns))
            good = expand(prod - sympify(c["expr"], ns)) == 0
        else:
            print("SKIP", label, c); continue
    except Exception as e:  # noqa: BLE001
        good = False
        print("ERROR", label, e)
    if good:
        ok += 1
    else:
        bad += 1
        print("FAIL", label, c)
print(f"Hand-solved checks: {ok} passed, {bad} failed")
