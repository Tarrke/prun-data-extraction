import { SnippetCore } from '../snippet-core';
import { LocalMarketExtractor } from '../extractors/localmarket-extractor';

(() => {
    var core = new SnippetCore();
    core.Run(LocalMarketExtractor);
})();



