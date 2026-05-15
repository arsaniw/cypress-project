# GitHub Actions CI/CD Pipeline Documentation

## Overview

This project includes 3 automated GitHub Actions workflows for continuous integration and continuous deployment of Cypress E2E tests.

---

## 🔄 Workflow 1: Cypress Tests (Main Branch Workflow)

**File**: `.github/workflows/cypress-tests.yml`

### Trigger Events
- **Push**: To `main` or `develop` branches
- **Pull Request**: Against `main` or `develop` branches

### Jobs
```yaml
Job Name: cypress-run
Runner: ubuntu-latest
Node Version: 16.x
```

### Execution Steps

1. **Checkout Code**
   - Uses: `actions/checkout@v3`
   - Retrieves repository code for testing

2. **Setup Node.js**
   - Uses: `actions/setup-node@v3`
   - Installs Node.js 16.x
   - Enables npm cache

3. **Install Dependencies**
   - Command: `npm ci`
   - Installs dependencies using lock file

4. **Run Traditional Cypress Tests**
   - Uses: `cypress-io/github-action@v5`
   - Browser: Chrome
   - Spec: `cypress/e2e/**/*.cy.js`

5. **Run BDD Feature Tests**
   - Uses: `cypress-io/github-action@v5`
   - Spec: `cypress/e2e/**/*.feature`
   - Continues on error (BDD optional)

6. **Upload Artifacts on Failure**
   - Uses: `actions/upload-artifact@v3`
   - Uploads: Screenshots and videos
   - Retention: 7 days

### Configuration
```yaml
Matrix:
  node-version: [16.x]

Environment:
  CYPRESS_BASE_URL: https://practicesoftwaretesting.com
```

### Status Checks
- ✅ Code checkout success
- ✅ Dependencies installed
- ✅ All traditional tests pass
- ⚠️ BDD tests (non-blocking)
- ✅ Artifacts uploaded on failure

---

## 🌙 Workflow 2: Nightly Tests

**File**: `.github/workflows/nightly-tests.yml`

### Trigger Events
- **Schedule**: Daily at 2:00 AM UTC
- **Manual**: `workflow_dispatch` for manual runs

### Cron Schedule
```yaml
Cron: '0 2 * * *'
# Runs every day at 02:00 UTC
# Monday-Sunday, all months
```

### Jobs
```yaml
Job Name: nightly-tests
Runner: ubuntu-latest
```

### Execution Steps

1. **Checkout Code**
   - Retrieves latest code

2. **Setup Node.js**
   - Installs Node.js 16.x with npm cache

3. **Install Dependencies**
   - `npm ci` for consistent installations

4. **Run All Cypress Tests**
   - Browser: Chrome
   - All test specs included
   - No record enabled

5. **Generate Test Report**
   - Creates timestamped completion report
   - Runs regardless of test result

6. **Archive Test Artifacts**
   - Uploads screenshots and videos
   - 30-day retention

7. **Notify on Failure**
   - Displays warning if tests fail
   - Directs to artifacts for details

### Key Features
- Runs independently of code commits
- Full test execution without code changes
- Extended artifact retention (30 days)
- Failure notifications included

---

## 🎯 Workflow 3: Manual Test Run

**File**: `.github/workflows/manual-test-run.yml`

### Trigger Events
- **Manual**: `workflow_dispatch`
- Allows manual test execution from GitHub UI

### Configuration Options
```yaml
Inputs:
  browser:
    - chrome (default)
    - firefox
    - edge
  
  spec:
    - all (default)
    - traditional
    - bdd
```

### Jobs
```yaml
Job Name: manual-test
Runner: ubuntu-latest
```

### Usage

1. Go to GitHub repository
2. Click "Actions" tab
3. Select "Manual Test Run" workflow
4. Click "Run workflow"
5. Select options:
   - Browser (chrome, firefox, edge)
   - Test type (all, traditional, bdd)
6. Click "Run workflow"

### Output
- Test results in workflow logs
- Artifacts uploaded on failure
- Detailed execution information

---

## 📊 Workflow Comparison

| Feature | Main | Nightly | Manual |
|---------|------|---------|--------|
| Trigger Type | Push/PR | Schedule | Manual |
| Frequency | Per commit | Daily @ 2 AM UTC | On demand |
| Browser | Chrome | Chrome | Configurable |
| Test Type | All | All | Configurable |
| Artifact Retention | 7 days | 30 days | Default |
| Failure Notification | Yes | Yes | Optional |
| Node Version | 16.x | 16.x | 16.x |

---

## 🔐 Environment Variables

All workflows use the following environment variables:

```yaml
CYPRESS_BASE_URL: https://practicesoftwaretesting.com
NODE_ENV: test (in CI)
HEADLESS: true (for CI execution)
```

Additional variables can be set in:
- Repository Settings → Secrets and variables → Actions
- Workflow file `env:` section

---

## 📈 Artifacts and Reports

### Generated Artifacts
- **Screenshots**: `cypress/screenshots/`
- **Videos**: `cypress/videos/`
- **Reports**: `mochawesome` reports (if enabled)

### Artifact Access
1. Go to workflow run
2. Click "Artifacts" section
3. Download desired artifact

### Retention Policies
- **Main workflow**: 7 days (configurable)
- **Nightly workflow**: 30 days (extended)
- **Manual workflow**: Default (7 days)

---

## 🛠️ Customization

### Change Test Browser
```yaml
with:
  browser: firefox  # Change from chrome to firefox
```

### Change Cron Schedule
```yaml
on:
  schedule:
    - cron: '0 3 * * *'  # Changed to 3 AM UTC
```

### Add Slack Notification
```yaml
- name: Slack Notification
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

### Record Results with Cypress Cloud
```yaml
- name: Run tests
  uses: cypress-io/github-action@v5
  with:
    record: true
    browser: chrome
  env:
    CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```

---

## 🚨 Troubleshooting

### Workflow Fails on Checkout
**Cause**: Repository not found or access denied  
**Solution**: 
- Verify repository URL
- Check GitHub credentials
- Ensure branch exists

### Node Modules Not Found
**Cause**: Dependencies not installed  
**Solution**:
- Check `npm ci` succeeds
- Verify package-lock.json exists
- Check node_modules exclusion in .gitignore

### Tests Timeout
**Cause**: Long-running tests  
**Solution**:
- Increase timeout in cypress.config.js
- Optimize test execution
- Run in parallel (requires Cypress Dashboard)

### Artifact Upload Fails
**Cause**: Path doesn't exist  
**Solution**:
- Verify artifact paths in workflow
- Check test runs to generate artifacts
- Ensure proper permissions

### Cron Schedule Not Triggering
**Cause**: Workflow disabled or scheduling issue  
**Solution**:
- Enable workflow in Actions tab
- Check cron syntax (use crontab.guru)
- Verify timezone (UTC only)

---

## 📋 Best Practices

### 1. Test Strategy
- ✅ Run lightweight tests on every push
- ✅ Run full suite during nightly builds
- ✅ Use manual workflow for debugging

### 2. Artifact Management
- ✅ Set appropriate retention periods
- ✅ Archive test results regularly
- ✅ Clean up old artifacts

### 3. Notifications
- ✅ Enable failure notifications
- ✅ Monitor workflow logs
- ✅ Set up Slack/email alerts

### 4. Performance
- ✅ Use npm cache
- ✅ Optimize test execution
- ✅ Parallel execution (with Cypress Dashboard)

### 5. Maintenance
- ✅ Update action versions quarterly
- ✅ Review and update Node.js version
- ✅ Monitor Cypress updates

---

## 🔄 CI/CD Flow

```
Developer Push to main/develop
         ↓
GitHub Actions Triggered
         ↓
Workflow: Cypress Tests
├─ Checkout Code
├─ Setup Node.js
├─ Install Dependencies
├─ Run Traditional Tests
├─ Run BDD Tests
└─ Upload Artifacts (if failed)
         ↓
Test Results Report
         ↓
Pass: ✅ Status Check OK → Can Merge PR
Fail: ❌ Status Check Failed → Fix Required
         ↓
Nightly Workflow (Independent)
├─ Runs Daily @ 2 AM UTC
├─ Full Test Suite
└─ Extended Artifact Retention
         ↓
Manual Workflow (On-Demand)
├─ Triggered from Actions UI
├─ Configurable Options
└─ Immediate Results
```

---

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cypress GitHub Action](https://github.com/cypress-io/github-action)
- [Cron Schedule Generator](https://crontab.guru/)
- [GitHub Workflows Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

---

## ✅ CI/CD Checklist

- [ ] All 3 workflows created
- [ ] Main workflow triggers on push/PR
- [ ] Nightly workflow runs on schedule
- [ ] Manual workflow available in Actions
- [ ] Node.js version appropriate
- [ ] npm cache enabled
- [ ] Base URL set correctly
- [ ] Artifacts configured
- [ ] Retention periods set
- [ ] Failure notifications enabled
- [ ] Workflows tested manually
- [ ] Documentation complete

---

## Summary

This CI/CD pipeline provides:
- ✅ Automated testing on every commit
- ✅ Daily comprehensive test runs
- ✅ On-demand manual testing
- ✅ Artifact preservation
- ✅ Failure notifications
- ✅ Flexible configuration

**Status**: Fully Operational ✅
