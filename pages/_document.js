import { Html, Head, Main, NextScript } from 'next/document'
import { useState } from 'react'
import { Toaster } from 'sonner'


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></script>
        <Toaster />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
