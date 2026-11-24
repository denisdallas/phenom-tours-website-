const tagManagerId = "GTM-KVK8CGDV"
const analyticsId = "G-313EXGKDTC"

export function TrackingHead() {
  if (process.env.NODE_ENV !== "production") return null
  return <>
    <script id="phenom-gtm" dangerouslySetInnerHTML={{ __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${tagManagerId}');
    ` }} />
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} />
    <script id="phenom-ga4" dangerouslySetInnerHTML={{ __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${analyticsId}');
    ` }} />
  </>
}

export function TagManagerFallback() {
  if (process.env.NODE_ENV !== "production") return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${tagManagerId}`}
        title="Google Tag Manager"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  )
}
