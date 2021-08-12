Users are able to search for their character and create notes fo individual classes or generalized notes/goals. 

* When submitted, findorCreate method used to search CharID or create charID, if exists, notes are loaded, if doesnt exist, ID is added to table and blank slate is rendered. Requests character id and character portrait, grabs ClassJob data from ClassJobs and populates dropdown menu (general notes selewtor added here for notes that do not pertain to a job) with characters current jobs using UnlockedState.Name from API. Portrait is rendered in center right with charname and servername above portrait (charName @ serverName). 
 * Select class button when clicked makes a GET request to /jobData (jobData.ejs). Display job icon, job title, notes, current EXP Level, and EXPLevel / ExpLevelMax. Render form to add notes. Tickboxes with trashcanIcon at top for deleting existing notes. TODO *** LAST *** Delete Notes button would display an alert box displaying the selected notes, to have the user confirm deletion.
 * Route to add note to selected page (creatureCrud) post route refreshes jobData.ejs with new notes
 * Route for delete notes (creatureCrud) delete route refreshes (methodOverride(Gitbook)) jobData.ejs after deletions are processed
* put route to update notes refresh jobData.ejs, edit button updates
* Get Route using Back Button from jobData.ejs to results.ejs so user can select different notes(demo in localStorage in express lesson in resources)
TODO * Get route for gen.ejs to display general character progression notes unrelated to a specific job

Searching your character through the lodestone allows you to create customized notes directly from your characters data as retreived through xivapi. 
