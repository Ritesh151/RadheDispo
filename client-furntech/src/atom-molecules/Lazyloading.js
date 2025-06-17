import React, { useEffect, useState } from "react";

function Lazyloading() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="bg-transparent row me-0 text-center align-items-center"
      >
        {showLoading && (
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Lazyloading;
