#!/usr/bin/env node
/**
 * update-affiliate-links.js
 * 
 * Updates affiliateUrl fields in tools.json with real tracking links.
 * 
 * Usage:
 *   node scripts/update-affiliate-links.js                  # dry run (preview changes)
 *   node scripts/update-affiliate-links.js --apply          # write changes to tools.json
 *   node scripts/update-affiliate-links.js --tool hubspot   # update single tool (dry run)
 *   node scripts/update-affiliate-links.js --tool hubspot --apply
 *
 * To add/update a link: edit AFFILIATE_LINKS below and run with --apply
 * 
 * Status key:
 *   ✅ approved + link live
 *   ⏳ applied / in review
 *   ❌ blocked / not applied
 *   🚫 no program
 */

const fs = require('fs');
const path = require('path');

// ─── AFFILIATE LINKS ──────────────────────────────────────────────────────────
// Add real tracking links here as programs approve you.
// Leave as null if not yet approved — script will skip and keep existing value.
// Use partners@bestformy.com for all applications.

const AFFILIATE_LINKS = {
  // ✅ CRM
  'hubspot':        null,  // ⏳ in review — HubSpot Partner Program
  'salesforce':     null,  // 🚫 no public affiliate program
  'pipedrive':      null,  // ⏳ applied — Pipedrive Affiliate Program
  'zoho-crm':       null,  // ❌ blocked — retry in incognito

  // ⏳ Project Management
  'asana':          null,  // ❌ not applied
  'monday':         null,  // ⏳ applied — monday.com Affiliate
  'trello':         null,  // 🚫 Trello/Atlassian — no public program
  'clickup':        null,  // ❌ not applied

  // ⏳ Invoicing / Accounting
  'freshbooks':     null,  // ⏳ applied — FreshBooks/Awin
  'invoice-ninja':  null,  // 🚫 no affiliate program
  'wave':           null,  // 🚫 free product, no program
  'quickbooks':     null,  // ⏳ applied — QuickBooks Affiliate
  'xero':           null,  // ❌ not applied
  'sage':           null,  // ❌ not applied

  // ⏳ Email Marketing
  'mailchimp':      null,  // 🚫 Mailchimp ended affiliate program
  'convertkit':     null,  // 🔴 NOT APPLIED YET — apply at https://kit.com/affiliates (30% recurring, 24mo)
  'constant-contact': null, // ❌ not applied

  // ⏳ Scheduling
  'calendly':       null,  // ❌ not applied
  'acuity-scheduling': null, // ❌ not applied
  'square-appointments': null, // 🚫 no program

  // ⏳ Field Service
  'servicetitan':   null,  // 🚫 enterprise only, no public program
  'jobber':         null,  // ❌ not applied — Jobber Affiliate (20%)
  'housecall-pro':  null,  // ❌ not applied

  // ⏳ Social Media
  'hootsuite':      null,  // ❌ not applied — Hootsuite Affiliate
  'buffer':         null,  // ❌ not applied
  'sprout-social':  null,  // 🚫 no public program

  // ⏳ Website Builders
  'squarespace':    null,  // ❌ not applied — Impact Radius (20%)
  'wix':            null,  // 🔴 NOT APPLIED YET — apply at https://signup.wixaffiliates.com/ ($100/sale)
  'wordpress-com':  null,  // ❌ not applied — Automattic Affiliate

  // ⏳ HR / Payroll
  'gusto':          null,  // 🔴 NOT APPLIED YET — apply at https://gusto.com/affiliates ($200/ref)
  'adp-run':        null,  // 🚫 no public program
  'paychex-flex':   null,  // 🚫 no public program
};

// ─── SCRIPT ───────────────────────────────────────────────────────────────────

const TOOLS_PATH = path.join(__dirname, '..', 'data', 'tools.json');
const args = process.argv.slice(2);
const apply = args.includes('--apply');
const filterTool = args.includes('--tool') ? args[args.indexOf('--tool') + 1] : null;

const tools = JSON.parse(fs.readFileSync(TOOLS_PATH, 'utf8'));

let updatedCount = 0;
let skippedCount = 0;

const updated = tools.map(tool => {
  if (filterTool && tool.slug !== filterTool) return tool;

  const newUrl = AFFILIATE_LINKS[tool.slug];

  if (newUrl === undefined) {
    console.log(`⚠️  ${tool.slug} — not in AFFILIATE_LINKS map (no change)`);
    skippedCount++;
    return tool;
  }

  if (newUrl === null) {
    console.log(`⏭️  ${tool.slug} — no link yet (skipped)`);
    skippedCount++;
    return tool;
  }

  if (tool.affiliateUrl === newUrl) {
    console.log(`✓  ${tool.slug} — already up to date`);
    return tool;
  }

  const prev = tool.affiliateUrl;
  console.log(`✅ ${tool.slug} — ${prev} → ${newUrl}`);
  updatedCount++;

  return { ...tool, affiliateUrl: newUrl };
});

console.log(`\n${apply ? '📝 APPLYING' : '👁️  DRY RUN'} — ${updatedCount} updates, ${skippedCount} skipped`);

if (updatedCount === 0) {
  console.log('Nothing to update.');
  process.exit(0);
}

if (!apply) {
  console.log('\nRun with --apply to write changes.');
  process.exit(0);
}

// Backup first
const backupPath = TOOLS_PATH.replace('.json', `.backup-${Date.now()}.json`);
fs.copyFileSync(TOOLS_PATH, backupPath);
console.log(`\n💾 Backup saved: ${path.basename(backupPath)}`);

fs.writeFileSync(TOOLS_PATH, JSON.stringify(updated, null, 2));
console.log(`✅ tools.json updated — ${updatedCount} link(s) written.`);
console.log('\n⚡ Next: rebuild + deploy → npm run build && vercel --prod');
