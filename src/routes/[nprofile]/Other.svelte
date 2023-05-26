<script lang=ts>
    import { HtmlTag } from "svelte/internal";

export let tag:string[]=[];

</script>

{#if tag.length>0}

    {#each tag as t}
        <p>{t}</p>
    {/each}
    

{/if}


