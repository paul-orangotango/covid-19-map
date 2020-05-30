import "styles/index.scss";
import { LeafletMap } from "./components/LeafletMap";
import Translator from "./utils/translator";
import { InfoWindow } from "./components/InfoWindow";
import { TitleDetails } from "./components/TitleDetails";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { getData } from "utils/data";
import { parseUriHash } from "utils/parse-hash";
import { defaultMapConfig } from "utils/constants";
import { dispatch } from "./utils/dispatch";

if (process.env.NODE_ENV !== "production") {
  dispatch.on("fetch-map-data-resolve.debug", console.log);
  dispatch.on("fetch-map-data-reject.debug", console.error);
}

const mapConfig = parseUriHash(defaultMapConfig);
var translator = new Translator({
  persist: false,
  languages: ["en", "pt"],
  defaultLanguage: mapConfig.lang,
  filesLocation: "/i18n",
});

new LeafletMap(mapConfig);
new InfoWindow(translator);
new TitleDetails();
new LoadingIndicator();

translator.load();
getData({ lang: mapConfig.lang });
