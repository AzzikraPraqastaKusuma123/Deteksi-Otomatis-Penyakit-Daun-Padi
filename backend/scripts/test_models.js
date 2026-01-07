import { InferenceSession } from 'onnxruntime-node';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelDir = path.resolve(__dirname, '../../model');

const modelsToTest = [
    'best_resnet50v2_latest_1.onnx',
    'best_resnet50v2_latest_2.onnx',
    'best_resnet50v2_latest.onnx' // The one that was working
];

async function testModels() {
    console.log('Starting model compatibility test...\n');

    for (const modelName of modelsToTest) {
        const modelPath = path.join(modelDir, modelName);
        console.log(`Testing: ${modelName}`);
        try {
            await InferenceSession.create(modelPath);
            console.log(`✅ SUCCESS: ${modelName} loaded successfully.\n`);
        } catch (error) {
            console.error(`❌ FAILED: ${modelName} failed to load.`);
            // console.error(error.message.split('\n')[0]); // Log just the first line of error for brevity
            console.log('\n');
        }
    }
}

testModels();
