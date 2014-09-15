goog.provide('kinyelo.annotate.Annotation');

goog.require('kinyelo.annotate.Author');

/** @enum {string} */
kinyelo.annotate.Annotation.AnnotationTypes = {
    COMMENT: 'COMMENT',
    CHARACTER: 'CHARACTER',
    POST: 'POST'
}

/**
 * @enum {string}
 */
kinyelo.annotate.Annotation.AnnotationStates = {
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE"
}

//TODO: see p 32 and 33 for more on typedef when updating this later

/**
 * @typedef {{
 post_id:number,
 type:kinyelo.annotate.Annotation.AnnotationTypes,
 state:kinyelo.annotate.Annotation.AnnotationStates,
 user_id:number,
 anchor:string,
 created_at:number,
 updated_at:number,
 state_updated_at:number,
 author:kinyelo.annotate.Author}}
 */
kinyelo.annotate.Annotation;