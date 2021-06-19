import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature(props) {
  const [SearchTerms, setSearchTerms] = useState("");

  const onChangeSearch = event => {
    setSearchTerms(event.currentTarget.value);

    props.refreshFunction(event.currentTarget.value);
  };

  return (
    <div style={{ margin: "auto" }}>
      <Search value={SearchTerms} onChange={onChangeSearch} placeholder="상품명" />
    </div>
  );
}

export default SearchFeature;
