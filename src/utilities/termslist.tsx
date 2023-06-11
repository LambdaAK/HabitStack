interface term {
    name: string;
    definition: string;
    related: string[];
}

const terms: term[] = [

    {
        name: "Term 1",
        definition: "This is the definition of term 1",
        related: ["Term 2", "Term 3"]
    }
    ,
    {
        name: "Term 2",
        definition: "This is the definition of term 2",
        related: ["Term 1", "Term 3"]
    }
    ,
    {
        name: "Term 3",
        definition: "This is the definition of term 3",
        related: ["Term 1", "Term 2"]
    }

]


export default terms