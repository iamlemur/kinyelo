goog.provide('kinyelo.annotate.Reply');

goog.require('kinyelo.annotate.Annotation');

/**
 * @typedef{{
 type:string,
 postId:string,
 noteId:string,
 replyId:string,
 content:string,
 author:string.
 state:kinyelo.annotate.Annotation.AnnotationStates,
 isRemoved:boolean,
 createdAt:number,
 updatedAt:number,
 removedAt:number,
 stateUpdatedAt:number
 }}
 *
 */
kinyelo.annotate.Reply;