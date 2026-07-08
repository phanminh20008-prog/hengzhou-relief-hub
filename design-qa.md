# Design QA

Reference: Image Gen option 3, public-facing Hengzhou flood relief information hub.

Prototype URL: http://127.0.0.1:5173/

Checks performed:

- Desktop capture at 1440 x 1024: passed.
- Mobile capture at 390 x 844: passed.
- Horizontal overflow: none on desktop or mobile.
- Interactions: demand filter, FAQ expand/collapse, login modal open/close.
- Responsive issue found and fixed: coordinator preview table no longer collapses into vertical text on mobile.
- Added intent and boundary statement: visible on desktop and mobile, with no horizontal overflow.

Notes:

- All private rescue details are represented as anonymized sample data.
- Official channels and data figures are prototype placeholders and should be replaced with verified local sources before public use.
- The intent section explicitly states that the site is a civilian remote information tool, does not collect money, does not replace official disaster publishing, and does not publicize personal credit.

Final result: passed
