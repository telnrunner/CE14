"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce, useDebouncedCallback } from "use-debounce";

const Search = () => {
  //search function
  const searchParams = useSearchParams();
  //แทนที่
  const { replace } = useRouter();
  //search state ติดตามเมื่อมีการเปลี่ยนค่าของ search
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  //use debounce สำหรับ หน่วงเวลา
  //get value ที่พิมพ์เข้ามา
  const haddleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    //เช็ค value
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    //
    replace(`/?${params.toString()}`);
  }, 300);

  //log
  console.log(searchParams.get("search"));

  useEffect(() => {
    //code body ถ้า serach ว่าจะให้ ติดตามไว้ แต่ set เป็นค่าว่าง
    if (!searchParams.get("search")) {
      setSearch("");
    }
  },[searchParams]);

  return (
    <div>
      <Input
        type="text"
        placeholder="ค้นหา"
        className="max-w-xs"
        onChange={(event) => {
          setSearch(event.target.value);
          haddleSearch(event.target.value);
        }}
        value={search}
      />
    </div>
  );
};

export default Search;
