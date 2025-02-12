# runs linter, formatter and tests for frontend and backend
pre-commit-frontend:
	cd frontend && npm run pre-commit

pre-commit-backend:
	cd backend && npm run pre-commit

pre-commit: pre-commit-frontend pre-commit-backend
