const fileInput = document.getElementById("fileInput");
const compressImageBtn = document.getElementById("compressImageBtn");
const result = document.getElementById("result");
const qualityGroup = document.getElementById("qualityGroup");
const qualitySelect = document.getElementById("qualitySelect");

fileInput.onchange = function () {
  result.innerHTML = "";
  compressImageBtn.style.display = "none";
  qualityGroup.style.display = "none";
  if (!fileInput.files.length) return;
  const file = fileInput.files[0];
  if (file.type.startsWith("image/")) {
    compressImageBtn.style.display = "inline-block";
    qualityGroup.style.display = "block";
  } else {
    alert("File tidak didukung. Pilih gambar.");
    fileInput.value = "";
  }
};

compressImageBtn.onclick = function () {
  if (!fileInput.files.length) return;
  const file = fileInput.files[0];
  let quality = 0.7;
  if (qualitySelect) {
    if (qualitySelect.value === "high") quality = 0.92;
    else if (qualitySelect.value === "medium") quality = 0.7;
    else if (qualitySelect.value === "low") quality = 0.4;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const maxW = 1024;
      const scale = Math.min(1, maxW / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        function (blob) {
          const url = URL.createObjectURL(blob);
          result.innerHTML = `<a href="${url}" download="compressed.jpg" class="btn btn-success my-3 animate__animated animate__fadeInDown">Unduh Gambar Terkompresi</a><br/><img src="${url}" class="img-fluid rounded shadow animate__animated animate__zoomIn animate__delay-1s"/>`;
          result.classList.remove("animate__fadeOut");
          result.classList.add("animate__fadeIn");
        },
        "image/jpeg",
        quality
      );
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};
