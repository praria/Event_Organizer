const events = [

     { event_type: 'feeling_ill', priority: 'Medium', description: 'guest has stomach ache after eating 5 pieces of cake' },
     { event_type: 'brawl', priority: 'High', description: 'two guests started fighting' },
     { event_type: 'dirty_table', priority: 'Low', description: 'a table is dirty' },
     { event_type: 'missing_bride', priority: 'High', description: 'the bride is missing' },
     {"event_type": "bride", "priority": "Low", "description": "Missing groom's ring moments before the ceremony"},
     {"event_type": "feeling_ill", "priority": "High", "description": "Disorganized valet parking causing delays in car retrieval"}, 
     {"event_type": "brawl", "priority": "Medium", "description": "Guest having difficulty breathing due to pollen allergy"}, 
     {"event_type": "groom", "priority": "High", "description": "Guest spilled red wine on their white dress"}, 
     {"event_type": "broken_itens", "priority": "High", "description": "Missing groom's ring moments before the ceremony"},
     {"event_type": "feeling_ill", "priority": "High", "description": "Disorganized valet parking causing delays in car retrieval"},
     {"event_type": "dirty_table", "priority": "Low", "description": "Missing name tags for reserved seats"}, 
     { "event_type": "music", "priority": "High", "description": "Vendor mix-up with cake flavors"}, 
     {"event_type": "music", "priority": "High", "description": "Wrong song played during first dance"}, 
     {"event_type": "accident", "priority": "High", "description": "Disorganized valet parking causing delays in car retrieval"}, 
     {"event_type": "dirty_floor", "priority": "Low", "description": "Vendor mix-up with cake flavors"},
     {"event_type": "bad_food", "priority": "High", "description": "Disorganized valet parking causing delays in car retrieval"}, 
     {"event_type": "broken_itens", "priority": "Medium", "description": "Disorganized valet parking causing delays in car retrieval"}, 
     {"event_type": "bride", "priority": "High", "description": "Guest feeling nauseous after eating undercooked meat"}, 
     {"event_type": "broken_itens", "priority": "High", "description": "Disorganized valet parking causing delays in car retrieval"}, 
     {"event_type": "feeling_ill", "priority": "High", "description": "Guest feeling nauseous after eating undercooked meat"}, 
     {"event_type": "feeling_ill", "priority": "Low", "description": "Missing table settings for head table"}, 
     {"event_type": "feeling_ill", "priority": "Medium", "description": "Missing table settings for head table"}, 
     {"event_type": "bride", "priority": "High", "description": "Dirty footprints noticed on the dance floor"},
     {"event_type": "broken_itens", "priority": "High", "description": "Missing groom's ring moments before the ceremony"},
     {"event_type": "accident", "priority": "High", "description": "Vendor mix-up with cake flavors"}, 
     {"event_type": "bad_food", "priority": "Low", "description": "Wrong song played during first dance"}, 
     {"event_type": "feeling_ill", "priority": "High", "description": "Guest feeling nauseous after eating undercooked meat"}, 
     {"event_type": "not_on_list", "priority": "High", "description": "Miscommunication led to insufficient chairs for guests"}, 
     {"event_type": "bad_food", "priority": "Low", "description": "Guest having difficulty breathing due to pollen allergy"}, 
     {"event_type": "bad_food", "priority": "Medium", "description": "Disorganized valet parking causing delays in car retrieval"},
     {"event_type": "not_on_list", "priority": "Low", "description": "Vendor mix-up with cake flavors"},
     {"event_type": "bride", "priority": "Low", "description": "Missing name tags for reserved seats"}, 
     {"event_type": "bad_food", "priority": "High", "description": "Missing groom's ring moments before the ceremony"},
     {"event_type": "bad_food", "priority": "Medium", "description": "Photographer's assistant forgot to bring extra batteries"}, 
     {"event_type": "broken_itens", "priority": "Medium", "description": "Dirty footprints noticed on the dance floor"}, 
     {"event_type": "bad_food", "priority": "High", "description": "Wrong song played during first dance"},
     {"event_type": "dirty_floor", "priority": "High", "description": "Photographer's assistant forgot to bring extra batteries"},
     {"event_type": "groom", "priority": "Low", "description": "Guest spilled red wine on their white dress"}, 
     {"event_type": "groom", "priority": "Medium", "description": "Vendor mix-up with cake flavors"}, 
     {"event_type": "dirty_table", "priority": "High", "description": "Guest having difficulty breathing due to pollen allergy"}, 
     {"event_type": "broken_itens", "priority": "High", "description": "Dirty footprints noticed on the dance floor"},
     {"event_type": "accident", "priority": "Medium", "description": "Dirty footprints noticed on the dance floor"}, 
     {"event_type": "broken_itens", "priority": "High", "description": "Missing name tags for reserved seats"}, 
     {"event_type": "not_on_list", "priority": "Low", "description": "Guest having difficulty breathing due to pollen allergy"}, 
     {"event_type": "groom", "priority": "High", "description": "Vendor mix-up with cake flavors"}, 
     {"event_type": "bad_food", "priority": "Low", "description": "Vendor mix-up with cake flavors"},
    {"event_type": "not_on_list", "priority": "High", "description": "Guest spilled red wine on their white dress"}, 
    {"event_type": "not_on_list", "priority": "Low", "description": "Photographer's assistant forgot to bring extra batteries"}, 
    {"event_type": "not_on_list", "priority": "Low", "description": "Guest having difficulty breathing due to pollen allergy"}, 
    {"event_type": "bad_food", "priority": "High", "description": "Guest feeling nauseous after eating undercooked meat"}, 
    {"event_type": "missing_rings", "priority": "High", "description": "Missing groom's ring moments before the ceremony"}, 
    {"event_type": "not_on_list", "priority": "High", "description": "Wrong song played during first dance"}, 
    {"event_type": "dirty_table", "priority": "Low", "description": "Missing table settings for head table"}, 
    {"event_type": "not_on_list", "priority": "Medium", "description": "Photographer's assistant forgot to bring extra batteries"}, 
    {"event_type": "not_on_list", "priority": "Medium", "description": "Dirty footprints noticed on the dance floor"}, 
    {"event_type": "not_on_list", "priority": "Low", "description": "Photographer's assistant forgot to bring extra batteries"}, 
    {"event_type": "music_too_loud", "priority": "Medium", "description": "Wrong song played during first dance"},
    {"event_type": "broken_itens", "priority": "Low", "description": "Missing groom's ring moments before the ceremony"}, 
    {"event_type": "accident", "priority": "High", "description": "Missing name tags for reserved seats"}, 
    {"event_type": "groom", "priority": "High", "description": "Vendor mix-up with cake flavors"}, 
    {"event_type": "dirty_floor", "priority": "Low", "description": "Disorganized valet parking causing delays in car retrieval"},
    {"event_type": "accident", "priority": "Low", "description": "Guest having difficulty breathing due to pollen allergy"}, 
    {"event_type": "broken_itens", "priority": "Low", "description": "Dirty footprints noticed on the dance floor"},
    {"event_type": "bad_food", "priority": "High", "description": "Photographer's assistant forgot to bring extra batteries"}, 
    {"event_type": "not_on_list", "priority": "High", "description": "Guest spilled red wine on their white dress"}, 
    {"event_type": "broken_itens", "priority": "High", "description": "Disorganized valet parking causing delays in car retrieval"},
    {"event_type": "dirty_floor", "priority": "High", "description": "Missing name tags for reserved seats"}, 
    {"event_type": "music", "priority": "Low", "description": "Miscommunication led to insufficient chairs for guests"},
    {"event_type": "accident", "priority": "High", "description": "Missing table settings for head table"}, 
    {"event_type": "dirty_table", "priority": "High", "description": "Missing name tags for reserved seats"}, 
    {"event_type": "brawl", "priority": "Low", "description": "Missing table settings for head table"}, 
    {"event_type": "bride", "priority": "Medium", "description": "Miscommunication led to insufficient chairs for guests"}, 
    {"event_type": "brawl", "priority": "Low", "description": "Missing groom's ring moments before the ceremony"}, 
    {"event_type": "brawl", "priority": "Medium", "description": "Miscommunication led to insufficient chairs for guests"}, 
    {"event_type": "not_on_list", "priority": "High", "description": "Guest feeling nauseous after eating undercooked meat"}, 
    {"event_type": "broken_itens", "priority": "Low", "description": "Missing name tags for reserved seats"}, 
    {"event_type": "dirty_floor", "priority": "Low", "description": "Photographer's assistant forgot to bring extra batteries"}, 
    {"event_type": "accident", "priority": "High", "description": "Dirty footprints noticed on the dance floor"}, 
    {"event_type": "dirty_floor", "priority": "Low", "description": "Dirty footprints noticed on the dance floor"}, 
    {"event_type": "accident", "priority": "Low", "description": "Dirty footprints noticed on the dance floor"}, 
    {"event_type": "bad_food", "priority": "Low", "description": "Missing table settings for head table"}]

module.exports = events;