import { initGlobal } from 'jimu-for-test';
//import utils from '../src/runtime/components/utils/utils';
//import ControllerFactory, {FlyMode} from '../src/runtime/components/controller-factory'
initGlobal();

describe('test api', () => {
  async function fetchApiUrl(url) {
    const apiUrl = 'https://js.arcgis.com/4.18/' + url;
    return await fetch(apiUrl, { cache: 'no-cache', method: 'GET' });
  }

  it('fetch Camera Api', async () => {
    const glCamera = await fetchApiUrl('esri/views/3d/webgl-engine/lib/Camera.js');
    expect(glCamera.ok).toBe(true);
    expect(glCamera.status).toBe(200);
  });

  it('fetch cameraUtils Api', async () => {
    const cameraUtils = await fetchApiUrl('esri/views/3d/support/cameraUtils');
    expect(cameraUtils.ok).toBe(true);
    expect(cameraUtils.status).toBe(200);
  });
});

// jest.mock('../src/runtime/components/utils/utils', () => {
//   return {
//     //externalRenderers:() => {}
//   }
// })
//describe('test controller', () => {
// it('rotate controller', () => {
//   const rotateController = ControllerFactory.make({
//     uuid: 'test-rotate-id',
//     mode: FlyMode.Rotate,
//     //debug?: boolean,
//     sceneView: {on:(()=>{})},
//     callbacks: null
//   });
//   expect(rotateController.GLCamera).toBeTruthy();
// });
//});