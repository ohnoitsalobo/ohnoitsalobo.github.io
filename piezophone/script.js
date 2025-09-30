import { WEQ8Runtime } from "https://cdn.skypack.dev/weq8";
import "https://cdn.skypack.dev/weq8/ui";

let weq8 = new WEQ8Runtime(yourAudioCtx);
yourAudioSourceNode.connect(weq8.input);
weq8.connect(yourAudioDestinationNode);

document.querySelector("weq8-ui").runtime = weq8;