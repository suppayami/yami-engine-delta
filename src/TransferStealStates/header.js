/*:
 * Yami Engine Delta - Transfer and Steal States
 *
 * @plugindesc v1.0.1 Allows creating skills that can transfer and/or steal
 * states to/from target.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @help
 * There is no Configuration and Plugin Command.
 *
 * ============================================================================
 *
 * Skill
 * To allow skill to steal certain states, use the following notetag with
 * X is/are states ID:
 *   <steal allow: X, X, X, ...>
 *
 * To allow skill to transfer certain states, use the following notetag with
 * X is/are states ID:
 *   <transfer allow: X, X, X, ...>
 *
 * To allow skill to steal states, use the following notetag with N is
 * number of states, X is priority order:
 *   <steal N states: X>
 *
 * To allow skill to transfer states, use the following notetag with N is
 * number of states, X is priority order:
 *   <transfer N states: X>
 *
 *
 * Priority order:
 *
 * -------------------------------------------------------------------------
 * high priority
 * low priority
 * last states
 * random
 * -------------------------------------------------------------------------
 *
 * ============================================================================
 */
