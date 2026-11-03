"""Checks every hand-solved homework step-answer with sympy."""
import json, pathlib
from sympy import I, expand, simplify, sympify, solve, symbols, nsimplify

checks = json.loads((pathlib.Path(__file__).parent / "checks.json").read_text())
names = {s: symbols(s) for s in "a b g m n p r s t u x y".split()}
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
