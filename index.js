import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiKey="2336704d7daee243abffeb3d601f36c6";
const url="http://ws.audioscrobbler.com/2.0/";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
 res.render("index.ejs",{result: null, error:null});
});

app.post("/submit", async (req, res) => {
    try {
        const artist=req.body.artist;
        console.log("artist posted by user: "+artist);
        const response = await axios.get(url + "?method=artist.gettoptracks&artist="+artist+"&api_key=" + apiKey + "&format=json");
        const result=response.data;
       
     // Check if tracks exist for the artist
     if (!result.toptracks.track || result.toptracks.track.length === 0) {
        res.render("index.ejs", { result: null, error: "No tracks found for the entered artist." });
        return;
    }
    const tracks=result.toptracks.track;
        res.render("index.ejs",{result:tracks, error: null});
    }
    catch (err) {
        console.log(err);
        res.render("index.ejs", { result:null , error: "something went wrong!" });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  