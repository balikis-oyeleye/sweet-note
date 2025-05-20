"use client";

import type { ChildrenType } from "@/models/types/global-types";
import React, { useEffect, useState } from "react";

const ClientProvider = ({ children }: ChildrenType) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientProvider;
