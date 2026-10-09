```javascript
document.addEventListener("DOMContentLoaded", function () {
    const lightbox = document.querySelector(".image-lightbox");

    if (!lightbox) return;

    // 创建保存按钮
    let saveButton = lightbox.querySelector(".image-save-button");

    if (!saveButton) {
        saveButton = document.createElement("button");
        saveButton.className = "image-save-button";
        saveButton.type = "button";
        saveButton.textContent = "↓ 保存图片到本地";
        lightbox.appendChild(saveButton);
    }

    // 保存当前放大的图片
    saveButton.addEventListener("click", async function (event) {
        event.stopPropagation();

        const img = lightbox.querySelector("img");

        if (!img || !img.src) {
            alert("没有找到图片，请重新打开图片后再试。");
            return;
        }

        const imageUrl = img.currentSrc || img.src;
        const filename = decodeURIComponent(
            imageUrl.split("/").pop().split("?")[0]
        ) || "图片";

        try {
            const response = await fetch(imageUrl);

            if (!response.ok) {
                throw new Error("下载失败");
            }

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = blobUrl;
            link.download = filename;

            document.body.appendChild(link);
            link.click();
            link.remove();

            setTimeout(function () {
                URL.revokeObjectURL(blobUrl);
            }, 3000);
        } catch (error) {
            window.open(imageUrl, "_blank");
            alert("无法直接下载图片。请在打开的图片上长按或右键保存。");
        }
    });
});
```
