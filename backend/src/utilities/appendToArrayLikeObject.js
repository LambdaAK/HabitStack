/**
* 
* @param object the array-like object to append to
* @param value the value to append to the array-like object
*/
module.exports = function appendToArrayLikeObject(object, value) {

   if (object == null || object == undefined) {
       object = {}
   }

   // find the smallest natural number that is not a key in object
   let smallestNaturalNumberNotKey = 0
   for (let i = 0; i < Object.keys(object).length; i++) {
       if (Object.keys(object).includes(i.toString())) {
           smallestNaturalNumberNotKey++
       }
   }

   // set the property
   Object.assign(object, {[smallestNaturalNumberNotKey] : value})
   
   return object;
}