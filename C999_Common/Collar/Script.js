var C999_Common_Collar_CurrentStage = 0;
var C999_Common_Collar_HasLooseCollar = false;

// Chapter Common - Collar Load
function C999_Common_Collar_Load() {

	// Load the scene parameters
	LeaveIcon = "Leave";
	LoadInteractions();

	// Set the correct stage
	if (PlayerHasLockedInventory("Collar") == true) C999_Common_Collar_CurrentStage = 10;
	else C999_Common_Collar_CurrentStage = 0;

	// If the player has a loose collar
	C999_Common_Collar_HasLooseCollar = PlayerHasInventory("Collar");

}

// Chapter Common - Collar Run, we draw the regular player image if the item is on
function C999_Common_Collar_Run() {
	BuildInteraction(C999_Common_Collar_CurrentStage);
	if (PlayerHasLockedInventory("Collar") && (OveridenIntroImage == "")) DrawPlayerImage(150, 50);
}

// Chapter Common - Collar Click, allow regular interactions and clicking on another item
function C999_Common_Collar_Click() {
	OveridenIntroImage = "";
	ClickInteraction(C999_Common_Collar_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}

// Chapter Common - Self Collar
function C999_Common_Collar_SelfCollar() {
	if ((Common_BondageAllowed) && (Common_SelfBondageAllowed)) {
		PlayerRemoveInventory("Collar", 1);
		PlayerLockInventory("Collar");
		C999_Common_Collar_HasLooseCollar = PlayerHasInventory("Collar");
	} else {
		OveridenIntroText = GetText("BadTiming");
		C999_Common_Collar_CurrentStage = 0;
	}
}

// Chapter Common - Self Uncollar
function C999_Common_Collar_SelfUncollar() {
	PlayerUnlockInventory("Collar");
	PlayerAddInventory("Collar", 1);
}

// Chapter Common - Show the item image
function C999_Common_Collar_ShowImage() {
	OveridenIntroImage = "Collar.jpg";
}