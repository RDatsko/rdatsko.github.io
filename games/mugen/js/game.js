function GameStart() {

    console.log(`---------------------------------------------------`);
    console.log(`JS M.U.G.E.N 2024.02.29) status log`);
    console.log(`---------------------------------------------------\n\n`);

//    console.log(`Initializing...`);
//    console.log(`Allocating game variables`);
//    console.log(`Reading configuration file...Setting language "en".`);
//    console.log(`OK`);
//    console.log(`Initializing timer...performance timer enabled...frequency 10000000...OK`);
//    console.log(`Initializing keyboard...configuring...OK`);
//    console.log(`Initializing input engine...OK`);
//    console.log(`Initializing sound...OK`);
//    console.log(`Initializing BGM...  OK`);
//    console.log(`Initializing graphics...gameCoord 1280x720...render mode 2_20...trying 1280x720x32 mode 0x0...success...OK`);
//    console.log(`Setting callbacks...OK`);
//    console.log(`Initializing font...OK`);
//    console.log(`Initializing game variables...OK`);
//    console.log(`Session RNG seed is 1710068372`);
//    console.log(`Loading system fonts...OK`);
//    console.log(`Loading options...`);
//    console.log(`Initializing pads...OK`);
//    console.log(`Reinitializing input engine...OK`);
//    console.log(`Remapping keys...OK`);
//    console.log(`Reinitializing input engine...OK`);
//    console.log(`Options loaded OK`);
//    console.log(`Loading system...`);
//    console.log(`  Load system file system.def...OK`);
//    console.log(`  Load system spr...OK`);
//    console.log(`  Load system snd...OK`);
//    console.log(`  Load system fonts...OK`);
//    console.log(`  Load system anim...OK`);
//    console.log(`  Load [Title Info]...OK`);
//    console.log(`  Load [Option Info]...OK`);
//    console.log(`  Load [Select Info]...OK`);
//    console.log(`  Load [VS Screen]...OK`);
//    console.log(`  Load [Victory Screen]...OK`);
//    console.log(`  Load [Demo Mode]...OK`);
//    console.log(`  Load [Continue Screen]...OK`);
//    console.log(`  Load [Game Over Screen]...OK`);
//    console.log(`  Load [Win Screen]...OK`);
//    console.log(`  Load [Survival Results Screen]...OK`);
//    console.log(`  Load [Default Ending]...OK`);
//    console.log(`  Load [End Credits]...OK`);
//    console.log(`  Load TitleBG...VersusBG...VictoryBG...SelectBG...OptionBG...OK`);
//    console.log(`  Loading fight data`);
//    console.log(`    Opening fight data file data/mugen1/fight.def...OK`);
//    console.log(`    Reading [Files]...OK`);
//    console.log(`    Loading fonts...OK`);
//    console.log(`    Load fight anim...OK`);
//    console.log(`    Reading [Lifebar]...[Turns Lifebar]...[Simul Lifebar]...[Powerbar]...`);
//    console.log(`    [Face]...[Simul Face]...[Turns Face]...`);
//    console.log(`    [Name]...[Simul Name]...[Turns Name]...`);
//    console.log(`    [Time]...[Combo]...[Round]...[WinIcon]...OK`);
//    console.log(`    Allocating explods...OK`);
//    console.log(`  Fight data loaded OK`);
//    console.log(`Lua initing`);
//    console.log(`Lua init complete`);
//    console.log(`System loaded OK`);
//    console.log(`Initialize OK`);
//    console.log(`Set up graphics...timer...OK`);
//    console.log(``);
//    console.log(`Entering gameflow loop`);
//    console.log(`Gameflow 0`);
//    console.log(`Gameflow 1`);
//    console.log(`Gameflow 2`);
//    console.log(`Initializing character info...OK`);
//    console.log(`Initializing select screen...finding characters...OK`);
//    console.log(`Gameflow 3`);
//    console.log(`Gameflow 4`);
//    console.log(`Entering mode select.`);
//    console.log(`Unloading match assets`);
//    console.log(`Freeing players`);
//    console.log(`Game loop init`);
//    console.log(`Mode select init`);
//    console.log(`End of mode select loop`);
//    console.log(`Game loop deinit`);
//    console.log(`Gameflow 6`);
//    console.log(`Reset persist vars team 0`);
//    console.log(`Reset persist vars team 1`);
//    console.log(`Gameflow 7`);
//    console.log(`Entering character select.`);
//    console.log(`Unloading match assets`);
//    console.log(`Freeing players`);
//    console.log(`Game loop init`);
//    console.log(`Unreserved all palettes`);
//    console.log(`Charsel init`);
//    console.log(`Selected char 0 on teamslot 0.0`);
//    console.log(`Char kfm.def (0) request pal 3 3F (3F) -> reserved 3 (37)`);
//    console.log(`Selected char 0 on teamslot 1.0`);
//    console.log(`Char kfm.def (0) request pal 3 3F (37) -> reserved 4 (27)`);
//    console.log(`Game loop deinit`);
//    console.log(`Canceled character select.`);
//    console.log(`Gameflow 4`);
//    console.log(`Entering mode select.`);
//    console.log(`Unloading match assets`);
//    console.log(`Freeing players`);
//    console.log(`Game loop init`);
//    console.log(`Mode select init`);
//    console.log(`End of mode select loop`);
//    console.log(`Game loop deinit`);
//    console.log(`Gameflow 6`);
//    console.log(`Reset persist vars team 0`);
//    console.log(`Reset persist vars team 1`);
//    console.log(`Gameflow 7`);
//    console.log(`Entering character select.`);
//    console.log(`Unloading match assets`);
//    console.log(`Freeing players`);
//    console.log(`Game loop init`);
//    console.log(`Unreserved all palettes`);
//    console.log(`Charsel init`);
//    console.log(`Game loop deinit`);
//    console.log(`Canceled character select.`);
//    console.log(`Gameflow 4`);
//    console.log(`Entering mode select.`);
//    console.log(`Unloading match assets`);
//    console.log(`Freeing players`);
//    console.log(`Game loop init`);
//    console.log(`Mode select init`);
//    console.log(`End of mode select loop`);
//    console.log(`Game loop deinit`);
//    console.log(`Gameflow 6`);
//    console.log(`Reset persist vars team 0`);
//    console.log(`Reset persist vars team 1`);
//    console.log(`Gameflow 7`);
//    console.log(`Entering character select.`);
//    console.log(`Unloading match assets`);
//    console.log(`Freeing players`);
//    console.log(`Game loop init`);
//    console.log(`Unreserved all palettes`);
//    console.log(`Charsel init`);
//    console.log(`Selected char 0 on teamslot 0.0`);
//    console.log(`Char kfm.def (0) request pal 3 3F (3F) -> reserved 3 (37)`);
//    console.log(`Selected char 1 on teamslot 1.0`);
//    console.log(`Char kfm720.def (1) request pal 3 3F (3F) -> reserved 3 (37)`);
//    console.log(`End of charsel loop`);
//    console.log(`Game loop deinit`);
//    console.log(`Gameflow 8`);
//    console.log(`Gameflow 9`);
//    console.log(`Gameflow 10`);
//    console.log(`Entering versus screen.`);
//    console.log(`Unloading match assets`);
//    console.log(`Freeing players`);
//    console.log(`Game loop init`);
//    console.log(`Versus screen init`);
//    console.log(`End of versus screen loop`);
//    console.log(`Game loop deinit`);
//    console.log(`Gameflow 11`);
//    console.log(`Loading match assets...`);
//    console.log(`Loading stage...`);
//    console.log(`  Loading BG...OK`);
//    console.log(`Stage loaded OK`);
//    console.log(`  Allocating helpers...OK`);
//    console.log(`Match RNG seed: 486330312`);
//    console.log(`Reset persist vars team 0`);
//    console.log(`Reset persist vars team 1`);
//    console.log(`Loading character chars/kfm/kfm.def...`);
//    console.log(`  Loading info...OK`);
//    console.log(`  Loading cmd command set kfm.cmd...OK`);
//    console.log(`  Loading cns kfm.cns...OK`);
//    console.log(`  Loading cmd state entry kfm.cmd...OK`);
//    console.log(`  Loading common states common1.cns...OK`);
//    console.log(`  Loading sff kfm.sff...OK`);
//    console.log(`  Loading anim kfm.air...OK`);
//    console.log(`  Loading snd kfm.snd...OK`);
//    console.log(`  Loading pals...OK`);
//    console.log(`  Loading learned AI kfm.ai...OK`);
//    console.log(`  3012 expressions (979 on trigger lines)`);
//    console.log(`Character kfm.def loaded OK`);
//    console.log(`New char Kung Fu Man loaded into cache: (1/4 cached) Load time: 40.000ms`);
//    console.log(`Loading character chars/kfm720/kfm720.def...`);
//    console.log(`  Loading info...OK`);
//    console.log(`  Loading cmd command set kfm720.cmd...OK`);
//    console.log(`  Loading cns kfm720.cns...OK`);
//    console.log(`  Loading cmd state entry kfm720.cmd...OK`);
//    console.log(`  Loading common states common1.cns...OK`);
//    console.log(`  Loading sff kfm720.sff...OK`);
//    console.log(`  Loading anim kfm720.air...OK`);
//    console.log(`  Loading snd kfm.snd...OK`);
//    console.log(`  Loading pals...OK`);
//    console.log(`  Loading learned AI kfm720.ai...OK`);
//    console.log(`  3011 expressions (978 on trigger lines)`);
//    console.log(`Character kfm720.def loaded OK`);
//    console.log(`New char Kung Fu Man 720 loaded into cache: (2/4 cached) Load time: 160.000ms`);
//    console.log(`Resetting round`);
//    console.log(`Match assets initialized OK`);
//    console.log(`Game loop init`);
//    console.log(`Match loop init`);
//    console.log(`Fullscreen toggle 1`);
//    console.log(`Fullscreen toggle 0`);
//    console.log(`Fullscreen toggle 1`);
//    console.log(`Resetting round`);
//    console.log(`Resetting round`);
//    console.log(`End of match loop`);
//    console.log(`Total time: 264.87s`);
//    console.log(`Total frames: 15892 	Skipped frames: 2`);
//    console.log(`Avg game rate: 60.00`);
//    console.log(`Avg frame rate: 59.99`);
//    console.log(``);
//    console.log(`Finishing match`);
//    console.log(`Freeing players`);
//    console.log(`Save persist vars P56 Kung Fu Man`);
//    console.log(`Player Kung Fu Man cache count reduced: 0`);
//    console.log(`Save persist vars P57 Kung Fu Man 720`);
//    console.log(`Player Kung Fu Man 720 cache count reduced: 0`);
//    console.log(`Match RNG closed`);
//    console.log(`Game loop deinit`);
//    console.log(`Gameflow 12`);
//    console.log(`Entering victory screen.`);
//    console.log(`Unloading match assets`);
//    console.log(`Freeing players`);
//    console.log(`Unloading stage...OK`);
//    console.log(`Game loop init`);
//    console.log(`Victory screen init`);
//    console.log(`End of victory screen loop`);
//    console.log(`Game loop deinit`);
//    console.log(`Gameflow 6`);
//    console.log(`Reset persist vars team 0`);
//    console.log(`Reset persist vars team 1`);
//    console.log(`Gameflow 7`);
//    console.log(`Entering character select.`);
//    console.log(`Unloading match assets`);
//    console.log(`Freeing players`);
//    console.log(`Game loop init`);
//    console.log(`Unreserved all palettes`);
//    console.log(`Charsel init`);
//    console.log(`Game loop deinit`);
//    console.log(`Canceled character select.`);
//    console.log(`Gameflow 4`);
//    console.log(`Entering mode select.`);
//    console.log(`Unloading match assets`);
//    console.log(`Freeing players`);
//    console.log(`Game loop init`);
//    console.log(`Mode select init`);
//    console.log(`End of mode select loop`);
//    console.log(`Game loop deinit`);
//    console.log(`Returned from gameflow loop`);
//    console.log(`Deinitializing...`);
//    console.log(`Frames      : 18555`);
//    console.log(`Time elapsed: 309.320 sec`);
//    console.log(`ticks: 30932, tps: 100, start 227, end 31159`);
//    console.log(``);
//    console.log(Unloading match assets``);
//    console.log(`Freeing players`);
//    console.log(`Clearing player cache...Freeing player RC Kung Fu Man...CMD...CNS...SFF...AIR...SND...Misc...OK`);
//    console.log(`Freeing player RC Kung Fu Man 720...CMD...CNS...SFF...AIR...SND...Misc...OK`);
//    console.log(`OK`);
//    console.log(`Freeing character info...OK`);
//    console.log(`Freeing select screen...OK`);
//    console.log(`Freeing fight data...OK`);
//    console.log(`Freeing system data...OK`);
//    console.log(`Freeing game variables...Unloading match assets`);
//    console.log(`Freeing players`);
//    console.log(`OK`);
//    console.log(`Deinitializing input...pad...keyboard...OK`);
//    console.log(`Removing callbacks...OK`);
//    console.log(`Deintializing timer...OK`);
//    console.log(`Deinitializing graphics...OK`);
//    console.log(`Deinitializing BGM...OK`);
//    console.log(`Deinitializing sound...OK`);
//    console.log(`Successful program termination.`);
//    console.log(``);
//    console.log(`Log file successfully closed.`);

}

GameStart();
