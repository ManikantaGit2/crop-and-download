let img = new Image();
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

document.getElementById("uploadImage").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

img.onload = function() {
    canvas.width = img.width / 2;
    canvas.height = img.height / 2;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function cropImage() {
    let cropX = 50, cropY = 50, cropWidth = 200, cropHeight = 200;
    let croppedImageData = ctx.getImageData(cropX, cropY, cropWidth, cropHeight);
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    ctx.putImageData(croppedImageData, 0, 0);
}

function downloadImage() {
    let link = document.createElement("a");
    link.download = "cropped_image.png";
    link.href = canvas.toDataURL();
    link.click();
}