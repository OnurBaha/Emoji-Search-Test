import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

import emojiList from "../emojiList.json";
import App from "../App";

describe("Emoji Search Tests",()=>{
  let header,emoji,input, filterList;


  beforeEach(()=>{
      render(<App/>);
    })
    
     // baslik kontrolu
    it('header test', () => { 
      header = screen.getByText(/Emoji Search/i);
      expect(header).toBeInTheDocument();

      const images = screen.getAllByRole("img"); 
      expect(images[0]);
      expect(images[1]); 
    })

    // Emoji listesinin başarılı bir şekilde render edildiğini kontrol edecek olan test kodu
    test("emoji list control",()=>{
      emoji = emojiList.slice(0,19);
      emoji.map((item)=> {expect(screen.getByText(item.title)).toBeInTheDocument();});
    })
    
    // Emoji listesinin filtreye uygun şekilde yeniden render edildiğini kontrol edecek olan test kodu
    test("emoji list filter and re-render",()=>{
    input = screen.getByRole("textbox"); 
    const filter = "smile cat";
    filterList = emojiList.filter(it => it.keywords.toLowerCase().match(filter) || it.title.toLowerCase().match(filter) );
    fireEvent.change(input, { target: { value: filter } });
    expect(screen.getAllByText(/cat/i)).toHaveLength(2);
  });

  // Liste üzerinden herhangi emojiye tıklandığında, ilgili emojinin kopyalandığını kontrol edecek olan test kodu
    test('proof that after click emoji, copy', async () => {
      const click = screen.getByText("100");
      expect(click.parentElement.getAttribute("data-clipboard-text").length).toBeGreaterThan(0);
      console.log(click.parentElement.getAttribute("data-clipboard-text"));
      expect(click.parentElement.getAttribute("data-clipboard-text")).toMatch("💯");
  });
});