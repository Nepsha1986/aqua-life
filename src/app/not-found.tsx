"use client";

import Error from "next/error";
import React from "react";

const ErrorPage = () => (
  <html lang="en">
    <body>
      <Error statusCode={404} />
    </body>
  </html>
);

export default ErrorPage;
