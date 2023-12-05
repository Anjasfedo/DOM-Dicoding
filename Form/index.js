document.addEventListener("DOMContentLoaded", function () {
  const inputMaxLengthOnLoad = document.getElementById("inputNama").maxLength;
  document.getElementById("sisaKarakter").innerText = inputMaxLengthOnLoad;

  document.getElementById("inputNama").addEventListener("input", () => {
    const typeChar = document.getElementById("inputNama").value.length;
    const maxChar = document.getElementById("inputNama").maxLength;

    const restChar = maxChar - typeChar;
    document.getElementById("sisaKarakter").innerText = restChar.toString();

    restChar === 0
      ? (document.getElementById("sisaKarakter").innerText =
          "Batas Maksimal Karakter Sudah Terpenuhi")
      : restChar <= 5
      ? (document.getElementById("notifikasiSisaKarakter").style.color = "red")
      : (document.getElementById("notifikasiSisaKarakter").style.color = "black");
  });

  document.getElementById("inputNama").addEventListener("focus", () => {
    document.getElementById("notifikasiSisaKarakter").style.visibility =
      "visible";
  });

  document.getElementById("inputNama").addEventListener("blur", () => {
    document.getElementById("notifikasiSisaKarakter").style.visibility =
      "hidden";
  });
});
