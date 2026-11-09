"""Checks every hand-solved homework step-answer with sympy."""
import json, pathlib
from sympy import I, FiniteSet, Interval, Lambda, Poly, S, Union, oo, real_root, solveset, sqrt, expand, simplify, sympify, solve, symbols, nsimplify

checks = json.loads((pathlib.Path(__file__).parent / "checks.json").read_text())
names = {s: symbols(s) for s in "a b g m n p r s t u x y z".split()}
ns = {**names, "I": I}
ok = bad = 0
for c in checks:
    label = c["label"]
    try:
        if "factored" in c:
            good = expand(sympify(c["expr"], ns) - sympify(c["factored"], ns)) == 0
        elif "result" in c and "expr" in c:
            good = simplify(sympify(c["expr"], ns) - sympify(c["result"], ns)) == 0
        elif "value" in c:
            good = simplify(sympify(c["value"], ns) - sympify(c["result"], ns)) == 0
        elif "roots" in c and c["roots"] is not None:
            v = names[c.get("variable", "x")]
            expr = sympify(c["expr"], ns)
            exact = {simplify(r) for r in solve(expr, v)}
            claimed = {simplify(sympify(r, ns)) for r in c["roots"]}
            good = len(exact) == len(claimed) and all(any(simplify(a - b) == 0 for b in exact) for a in claimed)
            if not good:
                print("   sympy roots:", exact)
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
