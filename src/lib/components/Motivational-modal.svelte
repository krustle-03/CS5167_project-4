<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let { isOpen = $bindable(false) } = $props();

  const motivationalMessages = [
    {
      title: "You're Stronger Than This",
      message: "A stumble isn't a fall. Every recovery journey has bumps in the road. What matters is that you're here, ready to try again. Your courage to continue is what defines you, not this moment."
    },
    {
      title: "Progress, Not Perfection",
      message: "Recovery isn't about being perfect - it's about showing up every day and trying. You've already shown incredible strength by making it this far. This setback doesn't erase all the progress you've made."
    },
    {
      title: "Tomorrow is a New Day",
      message: "Today might feel heavy, but tomorrow brings fresh possibilities. Every sunrise is a chance to recommit to your recovery. You have the power to write a new chapter starting right now."
    },
    {
      title: "You Are Worth Fighting For",
      message: "Remember why you started this journey. You deserve a life of freedom, health, and happiness. This moment doesn't define your worth or your future. Keep fighting for the person you're becoming."
    },
    {
      title: "One Day at a Time",
      message: "Recovery happens one moment at a time, one choice at a time, one day at a time. Don't focus on how far you have to go - just focus on the next right step. You can do this."
    },
    {
      title: "Your Story Isn't Over",
      message: "This is just one chapter in your recovery story, not the ending. Every person in recovery faces challenges. What makes you a survivor is your ability to keep going despite the obstacles."
    }
  ];

  let currentMessage = $state(getRandomMessage());
  let modalElement = $state();
  let Bootstrap = $state();

  function getRandomMessage() {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  }

  // Import Bootstrap on component mount
  onMount(async () => {
    if (browser) {
      Bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  });

  // Watch for isOpen changes and trigger Bootstrap modal
  $effect(() => {
    if (modalElement && Bootstrap && browser) {
      if (isOpen) {
        currentMessage = getRandomMessage();
        // Use Bootstrap's modal show method
        const modal = new Bootstrap.Modal(modalElement);
        modal.show();
        
        // Listen for Bootstrap's hidden event to sync state
        modalElement.addEventListener('hidden.bs.modal', () => {
          isOpen = false;
        }, { once: true });
      }
    }
  });

  function closeModal() {
    if (modalElement && Bootstrap) {
      const modal = Bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
</script>

<!-- Modal -->
<div 
  bind:this={modalElement}
  class="modal fade" 
  tabindex="-1" 
  role="dialog" 
  aria-labelledby="motivationalModalTitle" 
  aria-hidden="true"
  data-bs-backdrop="true"
  data-bs-keyboard="true"
>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="motivationalModalTitle">{currentMessage.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="text-center">{currentMessage.message}</p>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">I'm Ready to Continue</button>
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>