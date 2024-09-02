"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import axios from "axios";
import { Post } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearhInput({ id }: { id?: string }) {
  const router = useRouter();
  const [options, setOptions] = useState<Array<Post>>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  async function fetchOptions() {
    await axios
      .get("/api/searchBar")
      .then((res) => {
        setOptions(res.data.options);
      })
      .catch((error) => console.error(error));
  }

  React.useEffect(() => {
    fetchOptions();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/search?search=" + searchValue);
      }}
      className="w-full"
    >
      <Autocomplete
        value={searchValue}
        onChange={(event: React.SyntheticEvent, newValue) => {
          console.log(event);
          setSearchValue(newValue as string);
        }}
        className="w-full"
        size="small"
        freeSolo
        id={id}
        options={options.map((option) => option.title)}
        getOptionLabel={(option) => option}
        renderOption={(props, option) => {
          const { key, ...optionsProps } = props;
          return (
            <li key={key} {...optionsProps}>
              <Link
                href={"/blogs/" + option.toLowerCase().replace(/\s+/g, "-")}
              >
                {option}
              </Link>
            </li>
          );
        }}
        renderInput={(params: any) => (
          <TextField
            {...params}
            placeholder="Search..."
            slotprops={{
              input: {
                ...params.InputProps,
                type: "search",
              },
            }}
          />
        )}
      />
    </form>
  );
}
