import candidate from "../models/candidate";

export const initDatabase = async () => {
    try {
        const cands = [{
            name: "Donald-Trump",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/330px-Donald_Trump_official_portrait.jpg",
            votes: 0
        }, {
            name: "Kamala-Harris",
            image: "https://www.whitehouse.gov/wp-content/uploads/2021/04/V20210305LJ-0043-cropped.jpg?resize=2048,1536",
            votes: 0
        }
        ]
        const indexes = await candidate.collection.getIndexes();
        console.log('All indexes:', JSON.stringify(indexes, null, 2));
        for (let i = 0; i < cands.length; i++) {
            const newCandidate = new candidate(cands[i]);
            await newCandidate.save();
        }

    } catch (error) {
        console.log("Error accured while creating database: ", error);
        throw error
    }
}

export const getCandidatesService = async () => {
    try {
        const candidates = await candidate.find({}).sort({ votes: -1 });
        return candidates;
    } catch (error) {
        console.log("Error accured while getting candidates: ", error);
        throw error
    }
}