var SaveGameVersion = "7A";
var SaveChapter = "";
var SaveScreen = "";

// Opens the save menu for a specific chapter
function SaveMenu(NextChapter, NextScreen) {
	SaveChapter = NextChapter;
	SaveScreen = NextScreen;
	SetScene("C999_Common", "GameSave");
}

// Returns the save state summary
function SaveStateGetSummary(SlotNumber) {

	// Fetch the data
	var SN = SlotNumber.toString();	
	var Summary = "No save on slot " + SN;
	if (localStorage.getItem("SaveGameVersion" + SN))
		if (localStorage.getItem("SaveGameVersion" + SN) == SaveGameVersion) {
			var SaveStateChapter = localStorage.getItem("CurrentChapter" + SN);
			var SaveStateDateTime = localStorage.getItem("SaveGameDateTime" + SN);
			Summary = GetText("Slot") + " " + SN + " - " + GetText("Chapter") + " " + SaveStateChapter.substring(3, 4) + "|" + SaveStateDateTime;
		}
		
	// Returns the summary
	return Summary;

}

// Show some info on the slots to load or save
function SaveStateSlotSummary() {

	// If the current stage is loaded
	if ((CurrentStage != null) && (CurrentText != null))
		if (CurrentStage[1][StageInteractionText] == "Slot 1") {

			// For each save slots, we load the summary
			var Slot = 1;	
			while (Slot <= 5) {		
				CurrentStage[Slot][StageInteractionText] = SaveStateGetSummary(Slot);
				Slot++;		
			}
	
		}

}

// Save the game state on a specific slot
function SaveState(SlotNumber) {
	
	// Save the current state of the game and the transitional variables
	var SN = SlotNumber.toString();	
	localStorage.setItem("SaveGameVersion" + SN, SaveGameVersion);
	localStorage.setItem("SaveGameDateTime" + SN, GetFormatDate());
	localStorage.setItem("CurrentChapter" + SN, SaveChapter);
	localStorage.setItem("CurrentScreen" + SN, SaveScreen);
	localStorage.setItem("PlayerInventory" + SN, JSON.stringify(PlayerInventory));
	localStorage.setItem("PlayerLockedInventory" + SN, JSON.stringify(PlayerLockedInventory));
	localStorage.setItem("Actor" + SN, JSON.stringify(Actor));
	localStorage.setItem("Common_PlayerCrime" + SN, Common_PlayerCrime);

	// Reload the summaries
	CurrentStage[1][StageInteractionText] = "Slot 1";
	SaveStateSlotSummary();

}

// Load the game state on a specific slot
function LoadState(SlotNumber) {

	// If the save file is for the current version, we load
	var SN = SlotNumber.toString();	
	if (localStorage.getItem("SaveGameVersion" + SN))
		if (localStorage.getItem("SaveGameVersion" + SN) == SaveGameVersion) {

			// Load the game state
			CurrentChapter = localStorage.getItem("CurrentChapter" + SN);
			CurrentScreen = localStorage.getItem("CurrentScreen" + SN);
			PlayerInventory = JSON.parse(localStorage.getItem("PlayerInventory" + SN));
			PlayerLockedInventory = JSON.parse(localStorage.getItem("PlayerLockedInventory" + SN));
			Actor = JSON.parse(localStorage.getItem("Actor" + SN));
			Common_PlayerCrime = localStorage.getItem("Common_PlayerCrime" + SN);
			LoadRestrainStatus();
			SetScene(CurrentChapter, CurrentScreen);
	
			// Fix to make old save games from version 7 compatible
			for (var A = 0; A < Actor.length; A++)
				if (Actor[A].length == 7)
					Actor[A] = [Actor[A][0], Actor[A][1], Actor[A][2], Actor[A][3], Actor[A][4], Actor[A][5], Actor[A][6], "Clothed"];
	
		}

}