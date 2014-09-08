goog.provide('kinyelo.annotate.Annotation');

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

/**
 * @typedef {{
 postId:number,
 type:kinyelo.annotate.Annotation.AnnotationTypes,
 noteId:number,
 content:string,
 state:kinyelo.annotate.Annotation.AnnotationStates,
 author:number,
 anchor:string,
 highlightId:number,
 isRemoved:boolean,
 createdAt:number,
 updatedAt:number,
 stateUpdatedAt:number,
 removedAt:number,
 replies:Array<kinyelo.annotate.Annotation>}}
 */
kinyelo.annotate.Annotation;