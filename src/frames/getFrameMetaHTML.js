const getFrameMetaHTML = ({ title, imageUrl, postUrl, buttons = [], input }) => {
  const inputBox = `<meta property="fc:frame:input:text" content="${input}" />`;
  const buttonsMetadata = buttons
    .map(
      (button, i) => `<meta name="fc:frame:button:${i + 1}" content="${button.label}">
                      <meta property="fc:frame:button:${i + 1}:action" content="${button.action}" />
                      <meta property="fc:frame:button:${i + 1}:target" content="${button.target}"/>`
    )
    .join('');

  return `<!DOCTYPE html>
    <html>
      <head>
          <title>${title}</title>
          <meta property="og:title" content="${title}">
          <meta property="og:image" content="${imageUrl}">
          <meta name="fc:frame" content="vNext">
          <meta name="fc:frame:image" content="${imageUrl}">
          <meta name="fc:frame:post_url" content="${postUrl}">
          ${buttonsMetadata}
          ${inputBox}
      </head>
    </html>`;
};

module.exports = { getFrameMetaHTML };
