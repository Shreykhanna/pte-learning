import Layout from "./components/layout/Layout";
import { FillInTheBlanks } from "./components/reading/FillInTheBlanks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WriteEssay } from "./components/writing/WriteEssay";
import { SummariseWrittenText } from "./components/writing/SummariseWrittenText";
import ReadAloud from "./components/reading/ReadAloud";
import RepeatSentence from "./components/reading/RepeatSentence";
import Admin from "./components/admin/Admin";
import { DescribeImage } from "./components/reading/DescribeImage";
import SummariseSpokenText from "./components/listening/SummariseSpokenText";
import WriteFromDictation from "./components/listening/WriteFromDictation";
import ReTellLecture from "./components/reading/ReTellLecture";

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/reading/answer-short-question"
          element={<FillInTheBlanks />}
        />

        <Route path="/reading/read-aloud" element={<ReadAloud />} />
        <Route path="/reading/describe-image" element={<DescribeImage />} />
        <Route path="/reading/repeat-sentence" element={<RepeatSentence />} />
        <Route path="/reading/retell-lecture" element={<ReTellLecture />} />

        <Route path="/listening" element={<div>Listening Page</div>} />
        <Route
          path="/listening/summarise-spoken-text"
          element={<SummariseSpokenText />}
        />
        <Route
          path="/listening/write-from-dictation"
          element={<WriteFromDictation />}
        />

        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/writing/write-essay" element={<WriteEssay />} />
        <Route
          path="/writing/summarise-written-text"
          element={<SummariseWrittenText />}
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  );
}

export default App;
