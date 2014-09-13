goog.provide('kinyelo.annotate.Annotation');

goog.require('kinyelo.annotate.Author');

/** @enum {string} */
kinyelo.annotate.Annotation.AnnotationTypes = {
    COMMENT: 'comment',
    CHARACTER: 'character',
    POST: 'post'
}

/**
 * @enum {string}
 */
kinyelo.annotate.Annotation.AnnotationStates = {
    PUBLIC: "PUBLIC"
}

//TODO: see p 32 and 33 for more on typedef when updating this later

/**
 * @typedef {{
 postId:number,
 type:kinyelo.annotate.Annotation.AnnotationTypes,
 noteId:number,
 content:string,
 state:kinyelo.annotate.Annotation.AnnotationStates,
 authorId:number,
 anchor:string,
 highlightId:number,
 isRemoved:boolean,
 createdAt:number,
 updatedAt:number,
 stateUpdatedAt:number,
 removedAt:number,
 author:kinyelo.annotate.Author}}
 */
kinyelo.annotate.Annotation;