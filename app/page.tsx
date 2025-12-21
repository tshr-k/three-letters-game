import fs from "fs"
import { Game } from "@/components/game";

export interface TrigramToWordIdxs {
    [trigram: string]: number[]
}

export default async function Page() {
    const words = fs.readFileSync("./data/valid_words.csv", "utf-8").split(/\r?\n/);

    const trigramToWordIdxs: TrigramToWordIdxs = JSON.parse(
        fs.readFileSync("./data/trigram_to_word_idxs.json", "utf-8")
    );

    const trigramOccurrences = Object.entries(trigramToWordIdxs).map(
        (p): [number, string] => [p[1].length, p[0]]
    );
    const P = (numOcc: number) => 1/numOcc; // unnormalised probability mass function
    const norm = trigramOccurrences.map(
        ([numOcc, t]: [number, string]) => P(numOcc)).reduce((a,b)=>a+b
    );
    const cumulativeP = (sum => ([numOcc, t]: [number, string]): [number, string] => [sum += P(numOcc)/norm, t])(0);
    const trigramCumulativeP = trigramOccurrences.map(cumulativeP);
    
    return (
        <Game trigramCumulativeP={trigramCumulativeP} trigramToWordIdxs={trigramToWordIdxs} words={words}/>
    )
}