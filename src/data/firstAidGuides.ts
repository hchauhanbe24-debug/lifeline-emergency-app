import { FirstAidGuide } from '../types';

export const FIRST_AID_GUIDES: FirstAidGuide[] = [
  {
    id: 'cpr-adult',
    title: 'Adult CPR (Cardiopulmonary Resuscitation)',
    subtitle: 'Step-by-step life saving chest compressions & rescue breaths',
    category: 'cpr',
    categoryLabel: 'CPR & Resuscitation',
    shortDescription: 'Immediate emergency procedure for someone who has collapsed, is unresponsive, and is not breathing normally.',
    severity: 'critical',
    estimatedTime: 'Continuous until EMS arrives',
    verifiedBy: 'AIIMS & National CPR Protocol (Proposed)',
    isPopular: true,
    tags: ['CPR', 'Heart Attack', 'Cardiac Arrest', 'Unresponsive', 'No Pulse', 'Chest Compressions'],
    warnings: [
      'Call emergency services (112) or ask someone specifically to call before starting compressions.',
      'Place the person on a firm, flat surface (floor/ground). Never perform CPR on a soft bed.',
      'Maintain continuous compressions at 100 to 120 beats per minute (rhythm of "Stayin\' Alive").'
    ],
    whatNotToDo: [
      'DO NOT delay CPR to check for a pulse if you are not trained to find one in under 10 seconds.',
      'DO NOT bend your elbows; keep arms locked straight directly above the patient\'s sternum.',
      'DO NOT press on the lower tip of the breastbone (xiphoid process) or ribs.',
      'DO NOT interrupt chest compressions for more than 10 seconds under any circumstances.'
    ],
    equipmentNeeded: ['None required (Hands-only CPR is effective)', 'Automated External Defibrillator (AED) if available nearby'],
    steps: [
      {
        stepNumber: 1,
        title: 'Check Scene Safety',
        instruction: 'Look around before approaching to ensure the area is safe for both you and the victim.',
        detail: 'Look for traffic, live electrical wires, fire, falling debris, or gas leaks. You cannot help if you also become a casualty.',
        tip: 'If danger is present, move to safety or move the patient only if danger is imminent.',
        warning: 'Do not put yourself in harm\'s way.'
      },
      {
        stepNumber: 2,
        title: 'Check Responsiveness',
        instruction: 'Firmly tap both shoulders and speak loudly: "Are you okay? Can you hear me?"',
        detail: 'Check for any movement, groaning, opening of eyes, or verbal response. If there is no response, the person is unconscious.',
        tip: 'In infants or small children, tap the sole of their foot instead of shaking their shoulders.'
      },
      {
        stepNumber: 3,
        title: 'Call 112 & Get an AED',
        instruction: 'Point directly to a specific bystander: "You, call 112 and bring an AED immediately!"',
        detail: 'If you are completely alone, put your phone on speakerphone, dial 112, and begin CPR immediately while talking to the dispatcher.',
        warning: 'Every 60-second delay in CPR reduces cardiac arrest survival rates by 7–10%.'
      },
      {
        stepNumber: 4,
        title: 'Open the Airway & Check Breathing',
        instruction: 'Tilt head back gently and lift chin with two fingers. Look, listen, and feel for normal breathing for no more than 10 seconds.',
        detail: 'Agonal gasps (infrequent, noisy gasping) are NOT normal breathing—treat this as cardiac arrest.',
        tip: 'If breathing normally, place them in the Recovery Position and monitor closely.'
      },
      {
        stepNumber: 5,
        title: 'Hand Placement for Compressions',
        instruction: 'Place the heel of one hand in the center of the chest (lower half of breastbone). Interlock fingers of your other hand on top.',
        detail: 'Position your shoulders directly over your hands with arms locked straight. Keep your fingers lifted off the ribs.',
        tip: 'Ensure only the heel of your bottom hand touches the center breastbone.'
      },
      {
        stepNumber: 6,
        title: 'Push Hard and Fast (100–120 BPM)',
        instruction: 'Compress chest at least 2 inches (5 cm) deep at a rate of 100 to 120 compressions per minute.',
        detail: 'Allow complete chest recoil between each push. Do not lean on the chest between compressions.',
        warning: 'Use our CPR Metronome tool below to match the exact 110 BPM life-saving rhythm.'
      },
      {
        stepNumber: 7,
        title: 'Rescue Breaths (If Trained & Willing)',
        instruction: 'After 30 compressions, pinch the nose, seal your mouth over theirs, and give 2 gentle breaths (1 second each).',
        detail: 'Watch for the chest to visibly rise. If untrained or reluctant to do mouth-to-mouth, continue continuous Hands-Only CPR without stopping.',
        tip: 'Hands-Only CPR is just as effective for bystander cardiac arrest during the first several minutes.'
      },
      {
        stepNumber: 8,
        title: 'Continue Until Help Arrives or AED is Ready',
        instruction: 'Do not stop until emergency medical technicians take over, the person starts breathing normally, or you are physically unable to continue.',
        detail: 'If another bystander is present, switch compressions every 2 minutes (about 5 cycles of 30:2) to avoid exhaustion without losing rhythm.',
        tip: 'Turn on the AED immediately upon arrival; it will speak clear voice instructions.'
      }
    ]
  },
  {
    id: 'cpr-child',
    title: 'Child & Infant CPR',
    subtitle: 'Adapted pediatric CPR protocols for babies and young children',
    category: 'cpr',
    categoryLabel: 'CPR & Resuscitation',
    shortDescription: 'Specialized CPR guidance for infants under 1 year and children up to puberty.',
    severity: 'critical',
    estimatedTime: 'Continuous until EMS arrives',
    verifiedBy: 'AIIMS Pediatric Emergency Guidelines (Proposed)',
    tags: ['Pediatric', 'Baby', 'Infant', 'Child CPR', 'Breathing Emergency'],
    warnings: [
      'In children, cardiac arrest is most frequently caused by respiratory arrest or drowning.',
      'If alone with a child/infant, deliver 2 minutes (5 cycles) of CPR first before running to call 112.',
      'Use 2 fingers or 2 thumbs for an infant; use 1 hand heel for small children.'
    ],
    whatNotToDo: [
      'DO NOT use full adult two-handed force on an infant chest; it can fracture fragile ribs.',
      'DO NOT hyperextend an infant\'s neck when opening airway (keep in neutral "sniffing" position).',
      'DO NOT blow forcefully into an infant\'s lungs (use gentle puffs from your cheeks).'
    ],
    equipmentNeeded: ['Pediatric AED pads if available (or standard pads placed front and back)'],
    steps: [
      {
        stepNumber: 1,
        title: 'Check Safety & Tap Foot/Shoulder',
        instruction: 'Tap bottom of infant foot or gently tap child\'s shoulder and call their name.',
        detail: 'Look for breathing or chest movement. Never shake an infant.'
      },
      {
        stepNumber: 2,
        title: 'Deliver 5 Initial Rescue Breaths',
        instruction: 'If unresponsive and not breathing, seal mouth over baby\'s nose and mouth, or child\'s mouth, and give 5 gentle breaths.',
        detail: 'In children, oxygen deprivation is the primary issue. 5 initial breaths can be lifesaving.'
      },
      {
        stepNumber: 3,
        title: 'Compressions: 30 at 100–120 BPM',
        instruction: 'For infant: use 2 fingers in center of chest (1.5 inches depth). For child: use 1 heel of hand (2 inches depth).',
        detail: 'Perform 30 compressions followed by 2 gentle breaths. Maintain steady cadence.'
      },
      {
        stepNumber: 4,
        title: 'Call 112 After 2 Minutes',
        instruction: 'If you are alone and have no mobile speakerphone, perform 2 minutes of CPR first, then call 112 immediately.',
        detail: 'Quickly return to compressions after activating emergency dispatch.'
      }
    ]
  },
  {
    id: 'choking-adult',
    title: 'Adult Choking Relief (Heimlich Maneuver)',
    subtitle: 'Relieving acute airway blockage in conscious adults and older children',
    category: 'choking',
    categoryLabel: 'Airway & Choking',
    shortDescription: 'Rapid intervention for a person clutching their throat, unable to speak, cough, or breathe.',
    severity: 'critical',
    estimatedTime: 'Immediate (under 1 minute)',
    verifiedBy: 'AIIMS Emergency Medicine Advisory (Proposed)',
    isPopular: true,
    tags: ['Choking', 'Heimlich', 'Airway Blocked', 'Foreign Body', 'Abdominal Thrusts'],
    warnings: [
      'Confirm the person is actually choking: ask "Are you choking?" If they can cough forcefully or speak, encourage coughing—do not intervene yet.',
      'If the victim loses consciousness, lower them gently to the floor and immediately begin CPR.'
    ],
    whatNotToDo: [
      'DO NOT perform abdominal thrusts if the person is coughing forcefully or able to talk.',
      'DO NOT blind sweep the mouth with your fingers; you might push the lodged object deeper.',
      'DO NOT slap an upright choking adult without supporting their upper torso bent forward.'
    ],
    equipmentNeeded: ['None'],
    steps: [
      {
        stepNumber: 1,
        title: 'Recognize Universal Choking Sign',
        instruction: 'Look for hands clutched around neck, inability to breathe, high-pitched stridor, or turning blue.',
        detail: 'Ask: "Are you choking? Can you speak?" If they nod and cannot speak, act immediately.'
      },
      {
        stepNumber: 2,
        title: 'Deliver 5 Firm Back Blows',
        instruction: 'Stand slightly behind and to the side. Support chest with one hand and bend person forward. Deliver 5 sharp blows between shoulder blades with heel of hand.',
        detail: 'The forward lean ensures the dislodged object falls out of the mouth rather than sliding further down.'
      },
      {
        stepNumber: 3,
        title: 'Deliver 5 Abdominal Thrusts (Heimlich)',
        instruction: 'Stand behind victim. Wrap arms around waist. Make a fist with thumb side against abdomen just above belly button. Grasp fist with other hand and pull sharply inward and upward.',
        detail: 'Each thrust should be a distinct, quick movement designed to relieve the obstruction like a cork from a bottle.'
      },
      {
        stepNumber: 4,
        title: 'Alternate 5 & 5 Until Cleared',
        instruction: 'Repeat 5 back blows followed by 5 abdominal thrusts until the item pops out or person breathes.',
        detail: 'If victim passes out, safely lower them to the floor, call 112, and start CPR chest compressions.'
      }
    ]
  },
  {
    id: 'bleeding-control',
    title: 'Severe Bleeding Control & Tourniquet',
    subtitle: 'Direct pressure, wound packing, and hemorrhage stoppage',
    category: 'bleeding',
    categoryLabel: 'Trauma & Bleeding',
    shortDescription: 'Crucial steps to stop arterial and severe venous bleeding to prevent hypovolemic shock.',
    severity: 'critical',
    estimatedTime: '1 to 5 minutes',
    verifiedBy: 'AIIMS Trauma Centre Guidelines (Proposed)',
    isPopular: true,
    tags: ['Bleeding', 'Hemorrhage', 'Wound', 'Tourniquet', 'Pressure Bandage', 'Arterial Blood'],
    warnings: [
      'Bright red spurting blood indicates an arterial bleed and requires immediate aggressive direct pressure.',
      'Wear gloves or use a plastic barrier if possible to protect against bloodborne pathogens.'
    ],
    whatNotToDo: [
      'DO NOT remove existing dressings if blood seeps through; layer new absorbent gauze directly over them.',
      'DO NOT remove deeply embedded objects (knives, glass); stabilize them in place with rolled bandages.',
      'DO NOT loosen a tourniquet once applied until specialized trauma surgeons take over.'
    ],
    equipmentNeeded: ['Clean cloth or sterile gauze', 'Elastic bandage / wrap', 'Tourniquet or improvised cloth strip & stick'],
    steps: [
      {
        stepNumber: 1,
        title: 'Expose the Wound & Find Source',
        instruction: 'Quickly cut or pull away clothing to pinpoint the exact site of bleeding.',
        detail: 'Identify whether blood is spurting under pressure or pooling rapidly.'
      },
      {
        stepNumber: 2,
        title: 'Apply Continuous Firm Direct Pressure',
        instruction: 'Place clean gauze or cloth over the wound and push down with both hands using your full body weight.',
        detail: 'Hold firm, uninterrupted pressure for at least 5 minutes before checking.'
      },
      {
        stepNumber: 3,
        title: 'Pack Deep Wounds',
        instruction: 'For deep junctional wounds (groin, armpit, neck), pack gauze tightly into the wound cavity and press hard.',
        detail: 'Packing creates mechanical pressure directly against the ruptured blood vessel.'
      },
      {
        stepNumber: 4,
        title: 'Apply Tourniquet for Limb Bleeding',
        instruction: 'If bleeding from an arm or leg does not stop with pressure, apply tourniquet 2–3 inches above wound (never on a joint).',
        detail: 'Tighten windlass until bleeding stops completely. Note the exact time applied on the tourniquet band or patient\'s forehead.'
      }
    ]
  },
  {
    id: 'burns-treatment',
    title: 'Burns & Scalds Treatment',
    subtitle: 'Thermal, electrical, and chemical burn first response',
    category: 'burns',
    categoryLabel: 'Burns & Scalds',
    shortDescription: 'Proper cooling and dressing for minor to severe burns to prevent tissue necrosis and infection.',
    severity: 'urgent',
    estimatedTime: '20 minutes cooling',
    verifiedBy: 'National Burns Programme (Proposed)',
    tags: ['Burn', 'Scald', 'Fire', 'Hot Water', 'Chemical Burn', 'Blister'],
    warnings: [
      'Cool the burn under cool or lukewarm running tap water for a full 20 minutes.',
      'Seek immediate emergency care (112) for burns larger than the patient\'s palm, facial burns, or electrical burns.'
    ],
    whatNotToDo: [
      'DO NOT apply ice or ice-cold water; extreme cold damages already fragile burned skin.',
      'DO NOT apply toothpaste, butter, oil, turmeric, or raw egg whites to a burn.',
      'DO NOT pop or puncture intact blisters; blister fluid protects against deep infection.',
      'DO NOT peel away clothing that has melted and stuck to burned skin.'
    ],
    equipmentNeeded: ['Cool running water', 'Sterile cling film or clean non-adherent dressing', 'Clean blanket to keep patient warm'],
    steps: [
      {
        stepNumber: 1,
        title: 'Remove Source of Heat & Ensure Safety',
        instruction: 'Stop the burning process immediately. Extinguish flames, disconnect electricity, or brush away dry chemicals.',
        detail: 'Protect yourself first before contacting energized or chemically contaminated victims.'
      },
      {
        stepNumber: 2,
        title: 'Cool Under Running Water for 20 Minutes',
        instruction: 'Hold the burned area under gentle, cool running tap water for at least 20 minutes.',
        detail: 'Cooling dissipates residual heat in deeper skin layers and drastically reduces scar formation.'
      },
      {
        stepNumber: 3,
        title: 'Carefully Remove Jewelry and Loose Clothes',
        instruction: 'Take off rings, watches, bracelets, and belts before the burned limb starts swelling.',
        detail: 'Do not remove items of clothing that are adhered to the burned flesh.'
      },
      {
        stepNumber: 4,
        title: 'Cover Loosely with Clean Cling Film',
        instruction: 'Layer clear kitchen plastic film loosely over the burn (do not wrap tightly around limbs).',
        detail: 'Cling wrap seals out air, dramatically reducing severe burn pain and preventing bacterial infection.'
      }
    ]
  },
  {
    id: 'fractures-splinting',
    title: 'Fractures & Suspected Broken Bones',
    subtitle: 'Immobilization, comfort, and splinting basics',
    category: 'fractures',
    categoryLabel: 'Fractures & Trauma',
    shortDescription: 'Techniques to stabilize suspected fractures, prevent nerve damage, and manage severe pain.',
    severity: 'urgent',
    estimatedTime: '5 to 15 minutes',
    verifiedBy: 'AIIMS Orthopedic Emergency Unit (Proposed)',
    tags: ['Fracture', 'Broken Bone', 'Splint', 'Sprain', 'Dislocation', 'Deformity'],
    warnings: [
      'If bone has pierced through skin (open fracture), do not push it back inside. Cover with sterile dressing and control bleeding around the bone.',
      'Keep the injured limb completely still in the position found.'
    ],
    whatNotToDo: [
      'DO NOT attempt to straighten or re-align a deformed bone or joint.',
      'DO NOT allow the victim to walk on an injured leg or ankle.',
      'DO NOT give food or liquids if surgery might be required shortly.'
    ],
    equipmentNeeded: ['Padded splint, rolled magazines, or cardboard', 'Triangular bandages, ties, or cloth strips', 'Ice pack wrapped in a towel'],
    steps: [
      {
        stepNumber: 1,
        title: 'Immobilize the Injured Site',
        instruction: 'Support the limb above and below the suspected fracture site with your hands or cushions.',
        detail: 'Preventing movement stops sharp bone ends from lacerating blood vessels and nerves.'
      },
      {
        stepNumber: 2,
        title: 'Check Circulation Beyond Injury',
        instruction: 'Check fingers or toes for pulse, warmth, pink color, and sensation (can they wiggle toes?).',
        detail: 'If fingers/toes are cold, pale, or numb, emergency surgical attention is immediately required.'
      },
      {
        stepNumber: 3,
        title: 'Apply a Padded Splint If Necessary',
        instruction: 'Fasten a rigid object (cardboard, wooden slat, or magazine) on both sides of the bone using cloth ties.',
        detail: 'Splint the joint above and the joint below the fracture site to keep it secure.'
      },
      {
        stepNumber: 4,
        title: 'Apply Cold Pack & Elevate',
        instruction: 'Apply an ice bag wrapped in a cloth towel for 15-minute intervals to limit swelling.',
        detail: 'Elevate the limb above heart level only if it does not provoke sharp pain.'
      }
    ]
  },
  {
    id: 'recovery-position',
    title: 'The Recovery Position',
    subtitle: 'Safe airway posture for unresponsive breathing patients',
    category: 'recovery',
    categoryLabel: 'Airway & Position',
    shortDescription: 'Standard side-lying posture that prevents the tongue from blocking the airway and avoids aspiration if vomiting occurs.',
    severity: 'moderate',
    estimatedTime: '2 minutes',
    verifiedBy: 'Indian Red Cross Society Standard (Proposed)',
    isPopular: true,
    tags: ['Recovery Position', 'Unconscious', 'Breathing', 'Airway', 'Fainting', 'Seizure Aftercare'],
    warnings: [
      'Only use the Recovery Position if the patient is UNRESPONSIVE but BREATHING NORMALLY.',
      'If a spinal or neck injury is suspected (falls from height, car crashes), do not move them unless airway is compromised.'
    ],
    whatNotToDo: [
      'DO NOT place someone in the recovery position if they are not breathing (start CPR immediately instead).',
      'DO NOT leave the person unattended; continue checking their breathing every minute.'
    ],
    equipmentNeeded: ['None'],
    steps: [
      {
        stepNumber: 1,
        title: 'Position the Nearest Arm',
        instruction: 'Kneel by the victim. Place the arm closest to you at a right angle to their body, elbow bent with palm facing up.',
        detail: 'This anchors the shoulder as you prepare to roll them.'
      },
      {
        stepNumber: 2,
        title: 'Bring Far Hand Across Chest',
        instruction: 'Bring the person\'s far arm across their chest and hold the back of their hand against their near cheek.',
        detail: 'This hand will act as a cushion to support their head after the roll.'
      },
      {
        stepNumber: 3,
        title: 'Bend Far Knee & Roll Towards You',
        instruction: 'Grasp the far leg just above the knee and pull it up so the foot is flat on the ground. Pull the knee towards you to roll them onto their side.',
        detail: 'Rolling them onto their side keeps their airway clear and allows fluids or vomit to drain freely.'
      },
      {
        stepNumber: 4,
        title: 'Tilt Head Back & Ensure Airway Stays Open',
        instruction: 'Gently tilt the head back and lift the chin. Adjust the top leg so both hip and knee are bent at right angles.',
        detail: 'The bent leg stabilizes the body like a kickstand, preventing them from rolling onto their stomach.'
      }
    ]
  },
  {
    id: 'bites-stings',
    title: 'Snake Bites & Venomous Stings',
    subtitle: 'Indian krait, cobra, viper bite protocol & severe bee sting care',
    category: 'bites',
    categoryLabel: 'Envenomation & Bites',
    shortDescription: 'Evidence-based first aid for snake envenomation (Big Four Indian snakes) and anaphylactic insect stings.',
    severity: 'critical',
    estimatedTime: 'Immediate preparation for hospital',
    verifiedBy: 'National Snakebite Protocol India (Proposed)',
    tags: ['Snake Bite', 'Cobra', 'Viper', 'Krait', 'Scorpion', 'Bee Sting', 'Anaphylaxis'],
    warnings: [
      'In India, call 112 immediately and reach the nearest hospital with Anti-Snake Venom (ASV).',
      'Keep the victim calm and completely immobilized; movement speeds venom absorption through lymphatics.'
    ],
    whatNotToDo: [
      'DO NOT cut the wound or try to suck out venom with your mouth or suction devices.',
      'DO NOT apply a tight arterial tourniquet or wire; this causes severe gangrene and limb amputation.',
      'DO NOT apply ice packs, potassium permanganate, or herbal remedies to snakebites.',
      'DO NOT attempt to catch or kill the snake; take a safe photo from a distance if possible.'
    ],
    equipmentNeeded: ['Crepe bandage / pressure immobilization bandage', 'Rigid splint'],
    steps: [
      {
        stepNumber: 1,
        title: 'Reassure & Keep Victim Still',
        instruction: 'Keep the patient calm and resting flat. Minimize any physical movement.',
        detail: 'An elevated heart rate pumps venom through the lymphatic system faster.'
      },
      {
        stepNumber: 2,
        title: 'Remove Constricting Rings and Clothes',
        instruction: 'Immediately remove rings, anklets, bracelets, and shoes from the bitten limb before swelling begins.',
        detail: 'Severe edema can cause ischemic loss of fingers or toes if constricted.'
      },
      {
        stepNumber: 3,
        title: 'Apply Broad Pressure Bandage (If Elapid/Neurotoxic)',
        instruction: 'Wrap a broad elastic bandage firmly from fingers/toes upwards towards the torso (as tight as an ankle sprain wrap).',
        detail: 'Splint the limb to prevent movement. Do not remove the bandage until patient reaches hospital ASV administration.'
      },
      {
        stepNumber: 4,
        title: 'Transport Rapidly to Emergency Room',
        instruction: 'Transport the victim lying down to the nearest medical center stocked with polyvalent Anti-Snake Venom (ASV).',
        detail: 'Time to antivenom is the single most critical factor for survival.'
      }
    ]
  }
];
