# DOCUDOG VUE APP

App Description: The app is a simple tool for allowing users to submit a report regarding a lost dog they have found.  The app takes in their information and current location (lag/lng) and saves it so it can be viewed by the admin/owner.  The Dogs list and Map components show us the dogs that have been found.  (In a real world sample these would probably be separate authenticated portals, but this is just a fun project).
<br/>

Regarding the Requirements
<br/>
- there are several child components.  Namely the tabs component which has 3 components within it, Add, List and Map

- the "dogs" tab, lists the items in the array, and the map component also lists the items technically, as location markers.

- the items can be added (on the add tab) and removed on the "dogs" list tab.

- I used Vuex for storage.  Although this was a simple enough app, that a real world decision may have been to just manually code the storage action.  But for the sake of showcasing potential, I broke out the functions into mutations, actions, etc.   The app simply saves the details of the lost dog into storage, and lets the user know they've already submitted their report -- notice the object saved to local storage that is displayed on the "Add" tab.

- The app loads the state based on the lost dog report details -- although it doesn't do much beyond alerting the user and hiding the button.  I could add more functionality to this if you'd like to see it expanded.  It only adds a few details here, but I feel that it shows how more items could easily be added.

- For testing, I just created a very simple test that checks to see if the alert shows up on the "Dogs" list page if there are more than 3 dogs missing.  This may not be a real world example, but I wasn't sure how much I should expand the app to get into that territory. 


