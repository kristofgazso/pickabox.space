import React, { useState, useEffect } from 'react'

// Page title rotation for typewriter effect ~hz
const words = ["Bored?      ", "Shuffle, Rabbithole, and Repeat."];

export default function TypeEffect() {

    // Type writer Effects hooks
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [blink, setBlink] = useState(true);
    const [reverse, setReverse] = useState(false); 

    // temporary variable to disable blink when typing
    var typerDone = false;

    // Type Writer Effect (hz)
    useEffect(() => {
        
        // Check done typing all words
        if (index === words.length){
        return;
        }
        
        typerDone = true;
        // Checks if need to reverse, otherwise no
        if ( subIndex === words[index].length + 1 && 
            index !== words.length - 1 && !reverse ) {
        setReverse(true);
        return;
        }

        // keeps going to if sub index is 0
        if (subIndex === 0 && reverse) {
        setReverse(false);
        setIndex((prev) => prev + 1);
        return;
        }

        // time delay between reverse and typing itself
        const timeout = setTimeout(() => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 75 : subIndex === words[index].length ? 400 :
                    150, parseInt(Math.random() * 150)));
    
        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse]);

    // blinker and time delay
    useEffect(() => {
        const timeout2 = setTimeout(() => {
        if(typerDone){
            setBlink((prev) => !prev);
        }
        }, 500);
        return () => clearTimeout(timeout2);
    }, [blink]);

    return (
        <h1 style={pageTitle}>
            {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
        </h1>
    )
}

const pageTitle={
    fontFamily: 'Changa',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '48px',
    lineHeight: 'normal',
    margin: 'auto',
    justifyContent: 'center',
    padding: '0px',
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#222222'
  }