<script lang=ts>
    import { HtmlTag } from "svelte/internal";

export let tag:string[]=[];

</script>

{#if tag.length>0}
<div class="card p-4 drop-shadow">
    {#each tag as t}
        <p>{t}</p>
    {/each}
    
</div>
{/if}

<style>
    .card{
        margin-top: 5px;
    }
    </style>