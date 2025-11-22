// backend/scripts/backfillGeminiResources.js
import { getGenerativeAgriculturalResourceInfo } from '../services/detectionService.js';
import dotenv from 'dotenv';
import mysql from "mysql2"; // Import mysql2 for direct connection

dotenv.config({ path: './backend/.env' }); // Specify the correct path to .env relative to project root

async function backfillGeminiData() {
  console.log('Starting Gemini backfill for agricultural resources...');

  // Create a direct database connection for this script
  const scriptDb = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  }).promise(); // Use promise-based API for async/await

  try {
    // 1. Fetch all agricultural resources
    const [resources] = await scriptDb.query('SELECT id, name, description, gemini_overview_id, gemini_overview_en, gemini_usage_tips_id, gemini_usage_tips_en FROM agricultural_resources');
    console.log(`Found ${resources.length} agricultural resources.`);

    for (const resource of resources) {
      console.log(`Processing resource ID: ${resource.id}, Name: "${resource.name}"`);

      let updatedGeminiOverviewId = resource.gemini_overview_id;
      let updatedGeminiOverviewEn = resource.gemini_overview_en;
      let updatedGeminiUsageTipsId = resource.gemini_usage_tips_id;
      let updatedGeminiUsageTipsEn = resource.gemini_usage_tips_en;
      let geminiBenefitsJson = null; 
      let geminiRekomendasiTambahanJson = null;


      let needsUpdate = false;

      // Check and generate for Indonesian (id)
      if (!updatedGeminiOverviewId || updatedGeminiOverviewId.trim() === '' || !updatedGeminiUsageTipsId || updatedGeminiUsageTipsId.trim() === '') {
        console.log(`  Generating ID Gemini info for "${resource.name}"...`);
        const geminiInfoId = await getGenerativeAgriculturalResourceInfo(resource.name, resource.description, 'id');
        if (geminiInfoId && !geminiInfoId.error) {
          updatedGeminiOverviewId = geminiInfoId.overview;
          updatedGeminiUsageTipsId = geminiInfoId.usage_tips;
          if (geminiInfoId.benefits) {
            geminiBenefitsJson = JSON.stringify(geminiInfoId.benefits);
          }
          if (geminiInfoId.additional_recommendations) {
            geminiRekomendasiTambahanJson = JSON.stringify(geminiInfoId.additional_recommendations);
          }
          needsUpdate = true;
          console.log(`  Generated ID overview for "${resource.name}".`);
        } else {
          console.warn(`  Failed to generate ID Gemini info for "${resource.name}". Error: ${geminiInfoId?.message || 'Unknown'}`);
        }
      }

      // Check and generate for English (en)
      if (!updatedGeminiOverviewEn || updatedGeminiOverviewEn.trim() === '' || !updatedGeminiUsageTipsEn || updatedGeminiUsageTipsEn.trim() === '') {
        console.log(`  Generating EN Gemini info for "${resource.name}"...`);
        const geminiInfoEn = await getGenerativeAgriculturalResourceInfo(resource.name, resource.description, 'en');
        if (geminiInfoEn && !geminiInfoEn.error) {
          updatedGeminiOverviewEn = geminiInfoEn.overview;
          updatedGeminiUsageTipsEn = geminiInfoEn.usage_tips;
          needsUpdate = true;
          console.log(`  Generated EN overview for "${resource.name}".`);
        } else {
          console.warn(`  Failed to generate EN Gemini info for "${resource.name}". Error: ${geminiInfoEn?.message || 'Unknown'}`);
        }
      }

      // 3. Update the database if any Gemini info was generated/updated
      if (needsUpdate) {
        const updateQuery = `
          UPDATE agricultural_resources 
          SET 
            gemini_overview_id = ?, 
            gemini_overview_en = ?,
            gemini_usage_tips_id = ?,
            gemini_usage_tips_en = ?,
            gemini_benefits_json = COALESCE(?, gemini_benefits_json),
            gemini_rekomendasi_tambahan_json = COALESCE(?, gemini_rekomendasi_tambahan_json)
          WHERE id = ?
        `;
        const updateValues = [
          updatedGeminiOverviewId, 
          updatedGeminiOverviewEn, 
          updatedGeminiUsageTipsId, 
          updatedGeminiUsageTipsEn,
          geminiBenefitsJson,
          geminiRekomendasiTambahanJson,
          resource.id
        ];
        await scriptDb.query(updateQuery, updateValues);
        console.log(`  Updated Gemini data for resource ID: ${resource.id}`);
      } else {
        console.log(`  Gemini data already present for resource ID: ${resource.id}. No update needed.`);
      }
    }

    console.log('Gemini backfill process completed.');
  } catch (error) {
    console.error('Error during Gemini backfill:', error);
  } finally {
    scriptDb.end(); // Close the database connection
  }
}

backfillGeminiData();
