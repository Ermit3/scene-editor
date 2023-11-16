import { merge, times, sample, filter, random } from "lodash";
import { nouns, adjectives } from "@/config/name-list";

generate.generate = generate;

export function generate(options: any) {
  let defaults = {
    number: false,
    nouns,
    adjectives,
    words: 2,
    alliterative: false,
  };
  options = merge(defaults, options || {});

  let raw = getRawProjName(options);

  return {
    raw: raw,
    dashed: raw.join("-"),
    title: raw.map((w) => capitalize(w)).join(" "),
    spaced: raw.join(" "),
  };
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.substr(1);
}

function getRawProjName(options: any) {
  let raw: any[] = [];
  times(options.words - 1, function () {
    if (options.alliterative && raw.length)
      raw.push(
        sample(
          getAlliterativeMatches(options.adjectives, raw[0].substring(0, 1))
        )
      );
    else raw.push(sample(options.adjectives).toLowerCase());
  });

  if (options.alliterative)
    raw.push(
      sample(getAlliterativeMatches(options.nouns, raw[0].substring(0, 1)))
    );
  else raw.push(sample(options.nouns).toLowerCase());

  if (options.number) {
    raw.push(random(1, 9999));
  }
  return raw;
}

function getAlliterativeMatches(arr: any, letter: string) {
  let check = letter.toLowerCase();
  return filter(arr, function (elm) {
    return elm.substring(0, 1).toLowerCase() === check;
  });
}
