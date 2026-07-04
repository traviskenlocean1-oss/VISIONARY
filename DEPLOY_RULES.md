VISIONARY SITE DEPLOY RULES
============================
- ONLY branch: cloudflare/workers-autoconfig
- NEVER touch: main branch
- Base version: a57d5483
- Every change: one file, one push, confirm live before next change
- Before ANY push: run git status and confirm only intended file is changed
