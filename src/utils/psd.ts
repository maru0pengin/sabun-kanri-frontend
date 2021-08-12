
// export let getPSD = () => PSD.fromURL("/path/to/file.psd").then((psd:any) => {
//   document.getElementById('ImageContainer')?.appendChild(psd.image.toPng());
// });
// let url = "C:\guides.psd"
// export let getPSD = () => PSD.fromURL("/path/to/file.psd")

// export function psd(url: any) {
//   var PSD = require('psd');
//   return PSD.fromURL("/path/to/file.psd")
// }

export async function psd() {
  var PSD = require('psd');
  let url = "C:\guides.psd"
  await PSD.fromURL(url).then(function (psd:any) {
    console.log(psd);
    console.log(psd.tree().export());
  });
}