<script>
    let showResources = $state(false);
    let selectedCategory = $state('all');
    
    const resources = [
        // Crisis/Emergency
        {
            name: "National Suicide Prevention Lifeline",
            phone: "988",
            website: "https://suicidepreventionlifeline.org/",
            description: "24/7 crisis support for thoughts of suicide or emotional distress",
            category: "crisis"
        },
        {
            name: "Crisis Text Line",
            phone: "Text HOME to 741741",
            website: "https://www.crisistextline.org/",
            description: "24/7 text-based crisis support",
            category: "crisis"
        },
        
        // General Addiction Support
        {
            name: "SAMHSA National Helpline",
            phone: "1-800-662-HELP (4357)",
            website: "https://www.samhsa.gov/find-help/national-helpline",
            description: "24/7 treatment referral and information service",
            category: "general"
        },
        {
            name: "Addiction Center",
            website: "https://www.addictioncenter.com/",
            description: "Comprehensive addiction treatment resources and facility finder",
            category: "general"
        },
        
        // Alcohol
        {
            name: "Alcoholics Anonymous",
            website: "https://www.aa.org/",
            description: "12-step fellowship program for alcohol recovery",
            category: "alcohol"
        },
        {
            name: "SMART Recovery",
            website: "https://www.smartrecovery.org/",
            description: "Science-based addiction recovery support groups",
            category: "alcohol"
        },
        {
            name: "Al-Anon Family Groups",
            website: "https://al-anon.org/",
            description: "Support for families and friends of alcoholics",
            category: "alcohol"
        },
        
        // Drugs
        {
            name: "Narcotics Anonymous",
            website: "https://na.org/",
            description: "12-step fellowship for drug addiction recovery",
            category: "drugs"
        },
        {
            name: "Crystal Meth Anonymous",
            website: "https://www.crystalmeth.org/",
            description: "12-step program specifically for crystal meth addiction",
            category: "drugs"
        },
        {
            name: "Cocaine Anonymous",
            website: "https://ca.org/",
            description: "12-step fellowship for cocaine and crack addiction",
            category: "drugs"
        },
        
        // Online/Digital
        {
            name: "LifeRing Secular Recovery",
            website: "https://lifering.org/",
            description: "Secular, self-directed recovery support groups",
            category: "online"
        },
        {
            name: "In The Rooms",
            website: "https://www.intherooms.com/",
            description: "Online recovery community and meetings",
            category: "online"
        },
        {
            name: "Sober Grid",
            website: "https://www.sobergrid.com/",
            description: "Social network app for people in recovery",
            category: "online"
        },
        {
            name: "I Am Sober App",
            website: "https://iamsober.com/",
            description: "Sobriety tracking and motivation app",
            category: "online"
        },
        
        // Therapy/Professional
        {
            name: "Psychology Today Therapist Finder",
            website: "https://www.psychologytoday.com/us/therapists/addiction",
            description: "Find addiction specialists and therapists near you",
            category: "therapy"
        },
        {
            name: "BetterHelp",
            website: "https://www.betterhelp.com/",
            description: "Online therapy platform with addiction specialists",
            category: "therapy"
        },
        {
            name: "EMDR International Association",
            website: "https://www.emdria.org/",
            description: "Find EMDR therapists for trauma-related addiction",
            category: "therapy"
        }
    ];
    
    const categories = {
        all: "All Resources",
        crisis: "Crisis Support",
        general: "General Help",
        alcohol: "Alcohol",
        drugs: "Drugs",
        online: "Online/Apps",
        therapy: "Professional Help"
    };
    
    const filteredResources = $derived(
        selectedCategory === 'all' 
            ? resources 
            : resources.filter(resource => resource.category === selectedCategory)
    );
    
    function toggleResources() {
        showResources = !showResources;
    }
</script>

{#if showResources}
    <div class="modal-backdrop" onclick={toggleResources}></div>
    <div class="resources-modal">
        <div class="modal-header">
            <h3>Addiction Help Resources</h3>
            <button class="btn-close" onclick={toggleResources} aria-label="Close">&times;</button>
        </div>
        
        <div class="modal-body">
            <!-- Category Filter -->
            <div class="category-filter mb-3">
                {#each Object.entries(categories) as [key, label]}
                    <button 
                        class="btn btn-sm {selectedCategory === key ? 'btn-primary' : 'btn-outline-primary'}"
                        onclick={() => selectedCategory = key}
                    >
                        {label}
                    </button>
                {/each}
            </div>
            
            <!-- Resources List -->
            <div class="resources-list">
                {#each filteredResources as resource}
                    <div class="resource-card">
                        <h5>{resource.name}</h5>
                        <p class="resource-description">{resource.description}</p>
                        
                        <div class="resource-contact">
                            {#if resource.phone}
                                <div class="contact-item">
                                    <i class="bi bi-telephone"></i>
                                    <a href="tel:{resource.phone.replace(/[^0-9]/g, '')}" class="phone-link">
                                        {resource.phone}
                                    </a>
                                </div>
                            {/if}
                            
                            {#if resource.website}
                                <div class="contact-item">
                                    <i class="bi bi-globe"></i>
                                    <a href={resource.website} target="_blank" rel="noopener noreferrer" class="website-link">
                                        Visit Website
                                    </a>
                                </div>
                            {/if}
                        </div>
                        
                        <span class="resource-category badge bg-secondary">
                            {categories[resource.category]}
                        </span>
                    </div>
                {/each}
            </div>
        </div>
        
        <div class="modal-footer">
            <p class="disclaimer">
                <small>
                    <strong>Disclaimer:</strong> These resources are for informational purposes only. 
                    In case of emergency, call 911 or go to your nearest emergency room.
                </small>
            </p>
        </div>
    </div>
{/if}

<!-- Help Resources Button -->
<button 
    class="help-resources-btn"
    onclick={toggleResources}
    aria-label="View Help Resources"
    title="Addiction Help Resources"
>
    <i class="bi bi-question-circle"></i>
    Help
</button>

<style>
    .help-resources-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        border: none;
        border-radius: 25px;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .help-resources-btn:hover {
        background: #218838;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(40, 167, 69, 0.4);
    }
    
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1040;
    }
    
    .resources-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 800px;
        max-height: 80vh;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1050;
        display: flex;
        flex-direction: column;
    }
    
    .modal-header {
        display: flex;
        justify-content: between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #dee2e6;
        background: #f8f9fa;
        border-radius: 8px 8px 0 0;
    }
    
    .modal-header h3 {
        margin: 0;
        color: #343a40;
    }
    
    .btn-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6c757d;
        margin-left: auto;
    }
    
    .btn-close:hover {
        color: #495057;
    }
    
    .modal-body {
        padding: 20px;
        overflow-y: auto;
        flex-grow: 1;
    }
    
    .category-filter {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .category-filter .btn {
        font-size: 12px;
        padding: 4px 12px;
    }
    
    .resources-list {
        display: grid;
        gap: 16px;
    }
    
    .resource-card {
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 16px;
        background: #fff;
        position: relative;
    }
    
    .resource-card h5 {
        margin: 0 0 8px 0;
        color: #495057;
        font-size: 18px;
    }
    
    .resource-description {
        margin: 0 0 12px 0;
        color: #6c757d;
        font-size: 14px;
        line-height: 1.4;
    }
    
    .resource-contact {
        margin-bottom: 12px;
    }
    
    .contact-item {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
    }
    
    .contact-item i {
        width: 16px;
        color: #6c757d;
    }
    
    .phone-link, .website-link {
        color: #007bff;
        text-decoration: none;
        font-size: 14px;
    }
    
    .phone-link:hover, .website-link:hover {
        text-decoration: underline;
    }
    
    .resource-category {
        position: absolute;
        top: 12px;
        right: 12px;
        font-size: 10px;
    }
    
    .modal-footer {
        padding: 16px 20px;
        border-top: 1px solid #dee2e6;
        background: #f8f9fa;
        border-radius: 0 0 8px 8px;
    }
    
    .disclaimer {
        margin: 0;
        text-align: center;
        color: #6c757d;
    }
    
    @media (max-width: 768px) {
        .resources-modal {
            width: 95%;
            max-height: 90vh;
        }
        
        .modal-header, .modal-body, .modal-footer {
            padding: 16px;
        }
        
        .help-resources-btn {
            bottom: 16px;
            right: 16px;
            padding: 8px 16px;
            font-size: 14px;
        }
    }
</style>