// // utils/claimTemplate.js

// const claimtemplate = (claimer, food) => {
//     return `
//       <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
//         <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
//           <div style="background-color: #ffc107; padding: 16px;">
//             <h2 style="margin: 0; color: #333;">🍽️ Food Claimed!</h2>
//           </div>
//           <div style="padding: 24px;">
//             <p>Thank you for your kind donation. Someone has claimed the food item. Please coordinate the pickup or delivery accordingly.</p>
  
//             <h3 style="color: #333;">📝 Claim Details:</h3>
//             <ul style="line-height: 1.8;">
//               <li><strong>Food Claimed:</strong> ${food}</li>
//               <li><strong>Claimer Name:</strong> ${claimer.name}</li>
//               <li><strong>Email:</strong> <a href="mailto:${claimer.email}">${claimer.email}</a></li>
//               <li><strong>Phone:</strong> <a href="tel:${claimer.phone}">${claimer.phone}</a></li>
//               <li><strong>Location:</strong> ${claimer.address || 'No address provided'}</li>
//             </ul>
  
//             <p style="margin-top: 24px;">🙏 Thanks again for helping reduce food waste and spreading kindness.</p>
//           </div>
//           <div style="background-color: #f1f1f1; padding: 12px; text-align: center; font-size: 12px; color: #888;">
//             FoodShare | Spreading Meals, Spreading Smiles
//           </div>
//         </div>
//       </div>
//     `;
//   };
  
//   module.exports = claimtemplate;
  

const claimtemplate = (claimer, food) => {
    return  `
    <h3>Food Claimed: ${food}</h3>
    <p><strong>Claimed By:</strong> ${claimer.name}</p>
    <p><strong>Email:</strong> ${claimer.email}</p>
    <p><strong>Phone:</strong> ${claimer.phone}</p>
    <p><strong>Location:</strong> ${claimer.address ||'No address provided'}</p>
    <hr>
    <p>Please coordinate the pickup/delivery. Thank you for donating!</p>
  `;
  };
  
  module.exports = claimtemplate;
// const claimtemplate = (claimer, food) => {
//     return `
//   🍽️ Food Claimed!
  
//   Thank you for your kind donation. Someone has claimed the food item. Please coordinate the pickup or delivery accordingly.
  
//   📝 Claim Details:
//   - Food Claimed: ${food}
//   - Claimer Name: ${claimer.name}
//   - Email: ${claimer.email}
//   - Phone: ${claimer.phone}
//   - Location: ${claimer.address || 'No address provided'}
  
//   🙏 Thanks again for helping reduce food waste and spreading kindness.
  
//   FoodShare | Spreading Meals, Spreading Smiles
//   `;
//   };
  
//   module.exports = claimtemplate;
  