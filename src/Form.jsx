import React from "react";

function Form() {
  return (
    <form class="search-form">
      <label for="search">Search Villager: </label>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="enter name..."
      />
      <input type="submit" />
    </form>
  );
}

export default Form;
